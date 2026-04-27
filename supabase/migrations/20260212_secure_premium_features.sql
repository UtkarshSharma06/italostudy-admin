-- Comprehensive Server-Side Plan Security
-- Created: 2026-02-12
-- Purpose: Enforce plan-based access control for all premium features

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

DROP FUNCTION IF EXISTS public.check_has_premium_plan(UUID, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.check_subscription_active(UUID) CASCADE;

-- Check if requester has required premium tier OR is admin/staff
CREATE OR REPLACE FUNCTION public.check_has_premium_plan(required_tier TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  requester_id UUID := auth.uid();
  requester_plan TEXT;
  requester_role TEXT;
  is_staff BOOLEAN;
BEGIN
  -- Get requester info
  SELECT 
    LOWER(COALESCE(selected_plan, 'explorer')),
    role,
    COALESCE(role IN ('admin', 'staff') OR is_consultant = TRUE, FALSE)
  INTO requester_plan, requester_role, is_staff
  FROM profiles WHERE id = requester_id;

  -- Admins and Staff always have access
  IF requester_role = 'admin' OR is_staff THEN
    RETURN TRUE;
  END IF;

  RETURN requester_plan = ANY(
    CASE LOWER(required_tier)
      WHEN 'global' THEN ARRAY['global', 'elite', 'global admission plan']
      WHEN 'pro' THEN ARRAY['pro', 'elite', 'global', 'global admission plan']
      ELSE ARRAY['explorer', 'pro', 'elite', 'global', 'global admission plan']
    END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if subscription is active (not expired)
CREATE OR REPLACE FUNCTION public.check_subscription_active(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  expiry_date TIMESTAMPTZ;
BEGIN
  SELECT subscription_expiry_date INTO expiry_date
  FROM profiles WHERE id = user_uuid;
  
  -- NULL expiry = no expiration (lifetime or default)
  RETURN expiry_date IS NULL OR expiry_date > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SECURE RPC FUNCTIONS
-- =====================================================

DROP FUNCTION IF EXISTS public.get_velocity_data_secure(UUID, TEXT, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS public.get_module_proficiency_secure(UUID, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.check_practice_limit(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.check_mock_limit(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.can_view_expert_explanations(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.get_history_secure(UUID, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.check_concierge_access(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.get_analytics_subjects_secure(UUID, TEXT) CASCADE;

-- 1. Velocity Data (Pro+)
CREATE OR REPLACE FUNCTION public.get_velocity_data_secure(
  user_uuid UUID,
  exam_type_id TEXT,
  lookback_days INTEGER DEFAULT 7
)
RETURNS TABLE (activity_date DATE, score BIGINT, questions BIGINT, accuracy NUMERIC)
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check Pro+ plan and active status for requester
  IF public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid()) THEN
    RETURN QUERY
    SELECT * FROM public.get_student_activity_velocity(user_uuid, exam_type_id, lookback_days);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 2. Module Proficiency (Pro+)
CREATE OR REPLACE FUNCTION public.get_module_proficiency_secure(
  user_uuid UUID,
  exam_type_id TEXT
)
RETURNS TABLE (
  subject_name TEXT,
  total_questions INTEGER,
  correct_answers INTEGER,
  accuracy NUMERIC,
  avg_time_seconds NUMERIC
)
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  exam_ids TEXT[];
BEGIN
  -- Check Pro+ plan and status for requester
  IF public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid()) THEN
    -- Build exam_ids array to include legacy aliases
    exam_ids := ARRAY[exam_type_id];
    IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
    IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

    RETURN QUERY
    SELECT 
      up.subject AS subject_name,
      COUNT(*)::INTEGER AS total_questions,
      COUNT(*) FILTER (WHERE up.is_correct = TRUE)::INTEGER AS correct_answers,
      ROUND((COUNT(*) FILTER (WHERE up.is_correct = TRUE)::NUMERIC / NULLIF(COUNT(*), 0) * 100), 1) AS accuracy,
      ROUND(AVG(up.time_taken_seconds), 1) AS avg_time_seconds
    FROM user_practice_responses up
    WHERE up.user_id = user_uuid
      AND up.exam_type = ANY(exam_ids)
    GROUP BY up.subject
    ORDER BY subject_name;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 3. Practice Limit Check (15/day Explorer, unlimited Pro+)
CREATE OR REPLACE FUNCTION public.check_practice_limit(user_uuid UUID)
RETURNS JSON 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan TEXT;
  today_count INTEGER;
  daily_limit INTEGER;
BEGIN
  -- Get user's plan
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO user_plan 
  FROM profiles WHERE id = user_uuid;
  
  -- Set limits based on plan
  daily_limit := CASE
    WHEN user_plan IN ('global', 'elite', 'pro', 'global admission plan') THEN 999999
    ELSE 15
  END;
  
  -- Count today's practice questions
  SELECT COUNT(*)::INTEGER INTO today_count
  FROM user_practice_responses
  WHERE user_id = user_uuid
    AND created_at::DATE = CURRENT_DATE;
  
  RETURN json_build_object(
    'allowed', today_count < daily_limit,
    'remaining', GREATEST(0, daily_limit - today_count),
    'limit', daily_limit,
    'used', today_count,
    'plan', user_plan
  );
END;
$$ LANGUAGE plpgsql;

-- 4. Mock Exam Limit Check (1/month Explorer, unlimited Elite+)
CREATE OR REPLACE FUNCTION public.check_mock_limit(user_uuid UUID)
RETURNS JSON 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan TEXT;
  month_count INTEGER;
  monthly_limit INTEGER;
BEGIN
  -- Get user's plan
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO user_plan 
  FROM profiles WHERE id = user_uuid;
  
  -- Set limits based on plan (mocks are Elite+ feature)
  monthly_limit := CASE
    WHEN user_plan IN ('global', 'elite', 'global admission plan') THEN 999999
    ELSE 1
  END;
  
  -- Count this month's mock attempts
  SELECT COUNT(*)::INTEGER INTO month_count
  FROM tests
  WHERE user_id = user_uuid
    AND (is_mock = TRUE OR test_type = 'mock')
    AND created_at >= DATE_TRUNC('month', CURRENT_DATE);
  
  RETURN json_build_object(
    'allowed', month_count < monthly_limit,
    'remaining', GREATEST(0, monthly_limit - month_count),
    'limit', monthly_limit,
    'used', month_count,
    'plan', user_plan
  );
END;
$$ LANGUAGE plpgsql;

-- 5. Expert Explanation Access (Pro+ only)
CREATE OR REPLACE FUNCTION public.can_view_expert_explanations(user_uuid UUID)
RETURNS TABLE (
  allowed BOOLEAN,
  plan TEXT,
  reason TEXT
) 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan TEXT;
  has_access BOOLEAN;
BEGIN
  -- Get user's plan
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO user_plan 
  FROM profiles WHERE id = user_uuid;
  
  -- Pro and above can view expert explanations
  has_access := user_plan IN ('pro', 'elite', 'global', 'global admission plan');
  
  RETURN QUERY SELECT 
    has_access,
    user_plan,
    CASE 
      WHEN has_access THEN 'Access granted'
      ELSE 'Upgrade to Exam Prep Plan or higher to view expert explanations'
    END;
END;
$$ LANGUAGE plpgsql;

-- 6. Secure History Fetch (10 records Explorer, unlimited Pro+)
CREATE OR REPLACE FUNCTION public.get_history_secure(
  user_uuid UUID,
  exam_type_id TEXT
)
RETURNS TABLE (
  test_id UUID,
  created_at TIMESTAMPTZ,
  exam_type TEXT,
  test_type TEXT,
  status TEXT,
  score NUMERIC,
  total_questions INTEGER,
  correct_answers INTEGER,
  time_taken_seconds INTEGER
) 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan TEXT;
  record_limit INTEGER;
  exam_ids TEXT[];
BEGIN
  -- Get user's plan
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO user_plan 
  FROM profiles WHERE id = user_uuid;
  
  -- Set record limits
  record_limit := CASE
    WHEN user_plan IN ('pro', 'elite', 'global', 'global admission plan') THEN 999999
    ELSE 10
  END;

  -- Build exam_ids array to include legacy aliases
  exam_ids := ARRAY[exam_type_id];
  IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
  IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;
  
  -- Return limited history
  RETURN QUERY
  SELECT 
    t.id AS test_id,
    t.created_at,
    t.exam_type,
    t.test_type,
    t.status,
    t.score,
    t.total_questions,
    t.correct_answers,
    t.time_taken_seconds
  FROM tests t
  WHERE t.user_id = user_uuid
    AND t.exam_type = ANY(exam_ids)
    AND t.status = 'completed'
  ORDER BY t.created_at DESC
  LIMIT record_limit;
END;
$$ LANGUAGE plpgsql;

-- 7. Concierge Access Check (Global only)
CREATE OR REPLACE FUNCTION public.check_concierge_access(user_uuid UUID)
RETURNS TABLE (
  allowed BOOLEAN,
  plan TEXT,
  reason TEXT
) AS $$
DECLARE
  user_plan TEXT;
  has_access BOOLEAN;
  is_staff BOOLEAN;
BEGIN
  -- Get user's plan and staff status
  SELECT 
    LOWER(COALESCE(selected_plan, 'explorer')),
    COALESCE(role = 'staff' OR is_consultant = TRUE, FALSE)
  INTO user_plan, is_staff
  FROM profiles WHERE id = user_uuid;
  
  -- Global plan or staff can access concierge
  has_access := user_plan IN ('global', 'elite', 'global admission plan') OR is_staff;
  
  RETURN QUERY SELECT 
    has_access,
    user_plan,
    CASE 
      WHEN has_access THEN 'Access granted'
      ELSE 'Concierge services require Global Admission Plan'
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Subject Data Limit (2 subjects Explorer, all for Pro+)
CREATE OR REPLACE FUNCTION public.get_analytics_subjects_secure(
  user_uuid UUID,
  exam_type_id TEXT
)
RETURNS TABLE (
  subject TEXT,
  total_questions INTEGER,
  correct_answers INTEGER,
  accuracy NUMERIC,
  color TEXT
) AS $$
DECLARE
  user_plan TEXT;
  subject_limit INTEGER;
  exam_ids TEXT[];
BEGIN
  -- Get user's plan
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO user_plan 
  FROM profiles WHERE id = user_uuid;
  
  -- Set subject limits
  subject_limit := CASE
    WHEN user_plan IN ('pro', 'elite', 'global', 'global admission plan') THEN 999999
    ELSE 2
  END;

  -- Build exam_ids array to include legacy aliases
  exam_ids := ARRAY[exam_type_id];
  IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
  IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;
  
  -- Return subject analytics with limit
  RETURN QUERY
  WITH subject_colors AS (
    SELECT UNNEST(ARRAY['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']) AS color_value,
           generate_series(0, 4) AS color_idx
  )
  SELECT 
    up.subject,
    COUNT(*)::INTEGER AS total_questions,
    COUNT(*) FILTER (WHERE up.is_correct = TRUE)::INTEGER AS correct_answers,
    ROUND((COUNT(*) FILTER (WHERE up.is_correct = TRUE)::NUMERIC / NULLIF(COUNT(*), 0) * 100), 1) AS accuracy,
    sc.color_value AS color
  FROM user_practice_responses up
  CROSS JOIN subject_colors sc
  WHERE up.user_id = user_uuid
    AND up.exam_type = ANY(exam_ids)
  GROUP BY up.subject, sc.color_value, sc.color_idx
  ORDER BY total_questions DESC
  LIMIT subject_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.check_has_premium_plan(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_subscription_active(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_velocity_data_secure(UUID, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_module_proficiency_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_practice_limit(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_mock_limit(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_view_expert_explanations(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_history_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_concierge_access(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_analytics_subjects_secure(UUID, TEXT) TO authenticated;

-- =====================================================
-- ROLLBACK SUPPORT
-- =====================================================

-- To disable security temporarily (emergency only):
-- ALTER FUNCTION public.get_velocity_data_secure RENAME TO get_velocity_data_secure_DISABLED;
-- ALTER FUNCTION public.get_module_proficiency_secure RENAME TO get_module_proficiency_secure_DISABLED;

COMMENT ON FUNCTION public.check_has_premium_plan(TEXT) IS 'Helper function to check if requester has required premium tier OR is admin/staff';
COMMENT ON FUNCTION public.check_subscription_active IS 'Helper function to check if subscription is not expired';
COMMENT ON FUNCTION public.get_velocity_data_secure IS 'Secure RPC: Returns velocity data only for Global/Elite users';
COMMENT ON FUNCTION public.get_module_proficiency_secure IS 'Secure RPC: Returns module proficiency only for Global/Elite users';
COMMENT ON FUNCTION public.check_practice_limit IS 'Secure RPC: Checks daily practice limit (15 Explorer, unlimited Pro+)';
COMMENT ON FUNCTION public.check_mock_limit IS 'Secure RPC: Checks monthly mock limit (1 Explorer, unlimited Elite+)';
COMMENT ON FUNCTION public.can_view_expert_explanations IS 'Secure RPC: Checks if user can view expert explanations (Pro+)';
COMMENT ON FUNCTION public.get_history_secure IS 'Secure RPC: Returns history with plan-based limits';
COMMENT ON FUNCTION public.check_concierge_access IS 'Secure RPC: Checks concierge access (Global only)';
COMMENT ON FUNCTION public.get_analytics_subjects_secure IS 'Secure RPC: Returns subject analytics with limits';
