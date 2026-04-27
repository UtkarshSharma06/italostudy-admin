-- Migration: Comprehensive Student Data Fix
-- Date: 2026-03-07
-- Purpose: Fix ALL 400 errors on student profile by ensuring column names in RPCs match actual table schemas.

-- ==========================================================
-- 1. Fix get_analytics_subjects_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_analytics_subjects_secure(uuid, text);

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
    SUM(tp.total_questions)::integer as total,
    SUM(tp.correct_answers)::integer as correct
  FROM topic_performance tp
  WHERE tp.user_id = user_uuid AND tp.exam_type = exam_type_id
  GROUP BY tp.subject
  ORDER BY accuracy DESC
  LIMIT subject_limit;
END; $$;

-- ==========================================================
-- 2. Fix get_topic_performance_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_topic_performance_secure(uuid, text);

CREATE OR REPLACE FUNCTION public.get_topic_performance_secure(
    target_user_id uuid,
    target_exam_id text
)
RETURNS TABLE (
    topic text,
    subject text,
    accuracy_percentage numeric,
    total_answered integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if requester is Admin or high-tier
    IF public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid()) THEN
        RETURN QUERY
        SELECT tp.topic, tp.subject, tp.accuracy_percentage, tp.total_questions as total_answered
        FROM topic_performance tp
        WHERE tp.user_id = target_user_id
          AND tp.exam_type = target_exam_id;
    ELSE
        RETURN;
    END IF;
END;
$$;

-- ==========================================================
-- 3. Fix get_tests_secure (Ensure all columns exist)
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_tests_secure(uuid, text);

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
            SELECT t.id, 
                   COALESCE(t.test_type, 'practice'), 
                   t.status, 
                   COALESCE(t.correct_answers, 0), 
                   COALESCE(t.wrong_answers, 0),
                   COALESCE(t.skipped_answers, 0), 
                   COALESCE(t.total_questions, 0), 
                   COALESCE(t.time_limit_minutes, 0), 
                   COALESCE(t.time_remaining_seconds, 0),
                   t.created_at, 
                   t.exam_type, 
                   COALESCE(t.is_mock, false), 
                   COALESCE(t.score, 0)::numeric, 
                   COALESCE(t.penalty_score, 0)::numeric
            FROM tests t
            WHERE t.user_id = user_uuid
              AND t.exam_type = ANY(exam_ids)
            ORDER BY t.created_at DESC
            LIMIT 100;
    END IF;
END; $$;

-- ==========================================================
-- 4. Fix get_questions_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_questions_secure(uuid[]);

CREATE OR REPLACE FUNCTION public.get_questions_secure(
    target_test_ids uuid[]
)
RETURNS TABLE (
    id uuid,
    test_id uuid,
    question_text text,
    options jsonb,
    correct_index integer,
    user_answer integer,
    time_spent_seconds integer,
    subject text,
    topic text,
    question_number integer,
    difficulty text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if requester is Admin or high-tier
    IF public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid()) THEN
        RETURN QUERY
        SELECT q.id, q.test_id, q.question_text, q.options::jsonb, q.correct_index, 
               q.user_answer, COALESCE(q.time_spent_seconds, 0), q.subject, q.topic, 
               q.question_number, q.difficulty
        FROM questions q
        WHERE q.test_id = ANY(target_test_ids);
    ELSE
        RETURN;
    END IF;
END;
$$;

-- ==========================================================
-- 5. Grant Permissions
-- ==========================================================
GRANT EXECUTE ON FUNCTION public.get_analytics_subjects_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_topic_performance_secure(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tests_secure(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_questions_secure(uuid[]) TO authenticated;
