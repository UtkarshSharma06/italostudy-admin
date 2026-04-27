-- Migration: Master Access & Security Fix for Analytics
-- Date: 2026-03-06
-- Purpose: Standardize admin access across all secure RPCs and add profile summary RPC.

-- 1. Helper for standardized premium/admin check (Update if needed)
-- (Function check_has_premium_plan already exists and handles admins)

-- 2. Update get_tests_secure to handle admins by role
CREATE OR REPLACE FUNCTION public.get_tests_secure(
    user_uuid uuid,
    exam_type_id text
)
RETURNS TABLE (
    id uuid,
    test_type text,
    status text,
    correct_answers integer,
    wrong_answers integer,
    skipped_answers integer,
    total_questions integer,
    time_limit_minutes integer,
    time_remaining_seconds integer,
    created_at timestamptz,
    exam_type text,
    is_mock boolean,
    score numeric,
    penalty_score numeric
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    caller_id uuid := auth.uid();
    exam_ids text[];
BEGIN
    -- Allow if viewing own data OR authorized viewer (Admin/Global)
    IF caller_id = user_uuid OR public.check_has_premium_plan('pro') THEN
        exam_ids := ARRAY[exam_type_id];
        IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
        IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

        RETURN QUERY
            SELECT t.id, t.test_type, t.status, t.correct_answers, t.wrong_answers,
                   t.skipped_answers, t.total_questions, t.time_limit_minutes, t.time_remaining_seconds,
                   t.created_at, t.exam_type, t.is_mock, t.score, t.penalty_score
            FROM tests t
            WHERE t.user_id = user_uuid
              AND t.exam_type = ANY(exam_ids)
            ORDER BY t.created_at DESC
            LIMIT 100;
    END IF;
END; $$;

-- 3. Update get_history_secure to handle admins
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
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  record_limit INTEGER;
  exam_ids TEXT[];
BEGIN
  -- Record limit: Premium/Admin get unlimited, others get 10
  record_limit := CASE WHEN public.check_has_premium_plan('pro') THEN 999999 ELSE 10 END;

  exam_ids := ARRAY[exam_type_id];
  IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
  IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;
  
  RETURN QUERY
  SELECT t.id, t.created_at, t.exam_type, t.test_type, t.status, t.score, t.total_questions, t.correct_answers, t.time_taken_seconds
  FROM tests t
  WHERE t.user_id = user_uuid AND t.exam_type = ANY(exam_ids) AND t.status = 'completed'
  ORDER BY t.created_at DESC LIMIT record_limit;
END; $$;

-- 4. NEW: Secure Student Stats Summary
CREATE OR REPLACE FUNCTION public.get_student_stats_summary_secure(
    target_user_id uuid,
    exam_type_id text
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    res JSON;
    exam_ids text[];
    total_solved_practice integer;
    correct_practice integer;
    total_solved_tests integer;
    correct_tests integer;
    unique_solved_practice integer;
    total_hours numeric;
    current_streak integer;
    mock_count integer;
BEGIN
    -- Check Authorization
    IF auth.uid() != target_user_id AND NOT public.check_has_premium_plan('pro') THEN
        RETURN json_build_object('error', 'Unauthorized');
    END IF;

    exam_ids := ARRAY[exam_type_id];
    IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
    IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

    -- Practice Stats
    SELECT COUNT(*), COUNT(*) FILTER (WHERE is_correct = true), COUNT(DISTINCT question_id)
    INTO total_solved_practice, correct_practice, unique_solved_practice
    FROM user_practice_responses
    WHERE user_id = target_user_id AND exam_type = ANY(exam_ids);

    -- Test Stats
    SELECT COALESCE(SUM(total_questions), 0), COALESCE(SUM(correct_answers), 0), COUNT(*) FILTER (WHERE is_mock = true OR test_type = 'mock')
    INTO total_solved_tests, correct_tests, mock_count
    FROM tests
    WHERE user_id = target_user_id AND exam_type = ANY(exam_ids) AND status = 'completed';

    -- Time (Approximate)
    SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (updated_at - created_at))), 0) / 3600
    INTO total_hours
    FROM tests
    WHERE user_id = target_user_id AND status = 'completed';
    total_hours := total_hours + (total_solved_practice * 3.0 / 60.0); -- Adding 3 mins per practice

    -- Simplified Streak (Last 30 days activity)
    SELECT COUNT(DISTINCT created_at::date) INTO current_streak
    FROM (
        SELECT created_at FROM tests WHERE user_id = target_user_id
        UNION ALL
        SELECT created_at FROM user_practice_responses WHERE user_id = target_user_id
    ) activity
    WHERE created_at > NOW() - INTERVAL '30 days';

    RETURN json_build_object(
        'questionsSolved', unique_solved_practice + total_solved_tests,
        'accuracy', CASE WHEN (total_solved_practice + total_solved_tests) > 0 
                    THEN ROUND(((correct_practice + correct_tests)::numeric / (total_solved_practice + total_solved_tests) * 100), 1)
                    ELSE 0 END,
        'streak', current_streak,
        'mockExams', mock_count,
        'hoursTrained', ROUND(total_hours, 1)
    );
END; $$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_tests_secure(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_history_secure(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_stats_summary_secure(uuid, text) TO authenticated;
