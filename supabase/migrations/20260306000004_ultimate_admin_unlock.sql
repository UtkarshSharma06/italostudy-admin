-- Migration: Ultimate Admin Analytics Unlock (RETRY)
-- Date: 2026-03-06
-- Purpose: Completely unblocks Admins for all student analytics.

-- 0. Drop existing functions to allow changing return types
DROP FUNCTION IF EXISTS public.get_analytics_subjects_secure(uuid, text);
DROP FUNCTION IF EXISTS public.check_subscription_active(uuid);

-- 1. Fix Subscription Check for Admins
CREATE OR REPLACE FUNCTION public.check_subscription_active(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_p RECORD;
BEGIN
  SELECT subscription_expiry_date, role INTO user_p FROM profiles WHERE id = user_uuid;
  RETURN user_p.role = 'admin' OR user_p.subscription_expiry_date IS NULL OR user_p.subscription_expiry_date > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Unlock Subject Analytics for Admin Viewers
CREATE OR REPLACE FUNCTION public.get_analytics_subjects_secure(
  user_uuid UUID,
  exam_type_id TEXT
)
RETURNS TABLE (
  subject TEXT,
  accuracy NUMERIC,
  total INTEGER,
  correct INTEGER
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  requester_role TEXT;
  target_plan TEXT;
  subject_limit INTEGER;
BEGIN
  -- Get requester role
  SELECT role INTO requester_role FROM profiles WHERE id = auth.uid();
  -- Get target user plan
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO target_plan FROM profiles WHERE id = user_uuid;

  -- Logic: Admins see everything. Others see based on target plan or if it's themselves.
  IF requester_role = 'admin' OR auth.uid() = user_uuid OR target_plan != 'explorer' THEN
    subject_limit := 999;
  ELSE
    subject_limit := 2;
  END IF;

  RETURN QUERY
  SELECT 
    tp.subject,
    AVG(tp.accuracy_percentage)::numeric as accuracy,
    SUM(tp.total_answered)::integer as total,
    SUM(ROUND(tp.total_answered * tp.accuracy_percentage / 100))::integer as correct
  FROM topic_performance tp
  WHERE tp.user_id = user_uuid AND tp.exam_type = exam_type_id
  GROUP BY tp.subject
  ORDER BY accuracy DESC
  LIMIT subject_limit;
END; $$;

GRANT EXECUTE ON FUNCTION public.get_analytics_subjects_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_subscription_active(UUID) TO authenticated;
