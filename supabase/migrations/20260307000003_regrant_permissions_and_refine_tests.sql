-- Migration: 20260307000003_regrant_permissions_and_refine_tests.sql
-- Description: Consolidates user-confirmed working RPC definitions for student data analytics.

-- 1. Fix get_analytics_subjects_secure
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

-- 2. Fix get_topic_performance_secure
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
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    exam_ids text[];
BEGIN
    -- Authorization: Student viewing self OR Authorized Admin/Premium viewer
    IF auth.uid() = target_user_id OR (public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid())) THEN
        exam_ids := ARRAY[target_exam_id];
        IF target_exam_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
        IF target_exam_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

        RETURN QUERY
        SELECT tp.topic, tp.subject, tp.accuracy_percentage, tp.total_questions as total_answered
        FROM topic_performance tp
        WHERE tp.user_id = target_user_id
          AND tp.exam_type = ANY(exam_ids);
    ELSE
        RETURN;
    END IF;
END; $$;

-- 3. Fix get_tests_secure
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
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

-- 4. Fix get_questions_secure
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
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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
END; $$;

-- 5. Fix get_student_activity_velocity_secure
DROP FUNCTION IF EXISTS public.get_student_activity_velocity_secure(uuid, text, integer);
CREATE OR REPLACE FUNCTION public.get_student_activity_velocity_secure(
    user_uuid uuid,
    exam_type_id text,
    lookback_days integer DEFAULT 7
)
RETURNS TABLE (
    activity_date date,
    score bigint,
    questions bigint,
    accuracy numeric
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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
        WITH date_range AS (
            SELECT (CURRENT_DATE - (i || ' days')::INTERVAL)::DATE AS d
            FROM generate_series(0, lookback_days - 1) i
        ),
        test_activity AS (
            SELECT 
                created_at::DATE AS act_date,
                SUM(COALESCE(correct_answers, 0))::BIGINT AS correct_count,
                SUM(COALESCE(total_questions, 0))::BIGINT AS total_count
            FROM public.tests
            WHERE user_id = user_uuid
              AND exam_type = ANY(exam_ids)
            GROUP BY 1
        ),
        practice_activity AS (
            SELECT 
                created_at::DATE AS act_date,
                COUNT(*) FILTER (WHERE is_correct = true)::BIGINT AS correct_count,
                COUNT(*)::BIGINT AS total_count
            FROM public.user_practice_responses
            WHERE user_id = user_uuid
              AND exam_type = ANY(exam_ids)
            GROUP BY 1
        ),
        mock_activity AS (
            SELECT 
                created_at::DATE AS act_date,
                CASE 
                    WHEN overall_band IS NOT NULL THEN (overall_band * 10)::BIGINT
                    ELSE 50::BIGINT 
                END AS correct_count,
                100::BIGINT AS total_count
            FROM public.mock_exam_submissions
            WHERE user_id = user_uuid
            GROUP BY 1, overall_band
        ),
        combined_activity AS (
            SELECT act_date, correct_count, total_count FROM test_activity
            UNION ALL
            SELECT act_date, correct_count, total_count FROM practice_activity
            UNION ALL
            SELECT act_date, correct_count, total_count FROM mock_activity
        )
        SELECT 
            dr.d,
            COALESCE(SUM(ca.correct_count), 0)::BIGINT as score,
            COALESCE(SUM(ca.total_count), 0)::BIGINT as questions,
            CASE 
                WHEN SUM(ca.total_count) > 0 THEN 
                    ROUND((SUM(ca.correct_count)::NUMERIC / NULLIF(SUM(ca.total_count), 0)) * 100, 1)
                ELSE 0 
            END as accuracy
        FROM date_range dr
        LEFT JOIN combined_activity ca ON ca.act_date = dr.d
        GROUP BY dr.d
        ORDER BY dr.d ASC;
    END IF;
END; $$;

-- 6. Grant Permissions
GRANT EXECUTE ON FUNCTION public.get_analytics_subjects_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_topic_performance_secure(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tests_secure(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_questions_secure(uuid[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_activity_velocity_secure(uuid, text, integer) TO authenticated;
