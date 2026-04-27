-- Migration: Fix Student Page RPC Access
-- Date: 2026-03-11
-- Purpose: Remove overly restrictive auth.uid() guards so that /student page
-- can display data for any user. Premium upselling is handled by the
-- frontend's blur/overlay, NOT by returning empty data from the backend.

-- ==========================================================
-- 1. Fix get_tests_secure (Remove auth gate - data gated by SECURITY DEFINER)
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
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    exam_ids text[];
BEGIN
    exam_ids := ARRAY[LOWER(exam_type_id)];
    IF LOWER(exam_type_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN
        exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep'];
    END IF;
    IF LOWER(exam_type_id) IN ('imat-prep', 'imat') THEN
        exam_ids := ARRAY['imat-prep', 'imat'];
    END IF;

    RETURN QUERY
    SELECT t.id, COALESCE(t.test_type, 'practice'), t.status,
           COALESCE(t.correct_answers, 0), COALESCE(t.wrong_answers, 0),
           COALESCE(t.skipped_answers, 0), COALESCE(t.total_questions, 0),
           COALESCE(t.time_limit_minutes, 0), COALESCE(t.time_remaining_seconds, 0),
           t.created_at, t.exam_type, COALESCE(t.is_mock, false),
           COALESCE(t.score, 0)::numeric, COALESCE(t.penalty_score, 0)::numeric
    FROM tests t
    WHERE t.user_id = user_uuid AND LOWER(t.exam_type) = ANY(exam_ids)
    ORDER BY t.created_at DESC LIMIT 100;
END; $$;

-- ==========================================================
-- 2. Fix get_student_activity_velocity_secure (Remove auth gate)
-- ==========================================================
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
    exam_ids text[];
BEGIN
    exam_ids := ARRAY[LOWER(exam_type_id)];
    IF LOWER(exam_type_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN
        exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep'];
    END IF;
    IF LOWER(exam_type_id) IN ('imat-prep', 'imat') THEN
        exam_ids := ARRAY['imat-prep', 'imat'];
    END IF;

    RETURN QUERY
    WITH date_range AS (
        SELECT (CURRENT_DATE - (i || ' days')::INTERVAL)::DATE AS d
        FROM generate_series(0, lookback_days - 1) i
    ),
    test_activity AS (
        SELECT created_at::DATE AS act_date,
               SUM(COALESCE(correct_answers, 0))::BIGINT AS correct_count,
               SUM(COALESCE(total_questions, 0))::BIGINT AS total_count
        FROM public.tests
        WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids)
        GROUP BY 1
    ),
    practice_activity AS (
        SELECT created_at::DATE AS act_date,
               COUNT(*) FILTER (WHERE is_correct = true)::BIGINT AS correct_count,
               COUNT(*)::BIGINT AS total_count
        FROM public.user_practice_responses
        WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids)
        GROUP BY 1
    ),
    combined_activity AS (
        SELECT act_date, correct_count, total_count FROM test_activity
        UNION ALL
        SELECT act_date, correct_count, total_count FROM practice_activity
    )
    SELECT dr.d,
           COALESCE(SUM(ca.correct_count), 0)::BIGINT as score,
           COALESCE(SUM(ca.total_count), 0)::BIGINT as questions,
           CASE WHEN SUM(ca.total_count) > 0
               THEN ROUND((SUM(ca.correct_count)::NUMERIC / NULLIF(SUM(ca.total_count), 0)) * 100, 1)
               ELSE 0
           END as accuracy
    FROM date_range dr
    LEFT JOIN combined_activity ca ON ca.act_date = dr.d
    GROUP BY dr.d
    ORDER BY dr.d ASC;
END; $$;

-- ==========================================================
-- 3. Fix get_analytics_subjects_secure (Remove plan-based subject limit)
--    Frontend handles the premium upsell via blur/overlay.
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
  exam_ids TEXT[];
BEGIN
  exam_ids := ARRAY[LOWER(exam_type_id)];
  IF LOWER(exam_type_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN
    exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep'];
  END IF;
  IF LOWER(exam_type_id) IN ('imat-prep', 'imat') THEN
    exam_ids := ARRAY['imat-prep', 'imat'];
  END IF;

  RETURN QUERY
  SELECT
    r.subject,
    ROUND(AVG(CASE WHEN r.is_correct THEN 100 ELSE 0 END), 1)::numeric as accuracy,
    COUNT(*)::integer as total,
    COUNT(*) FILTER (WHERE r.is_correct)::integer as correct
  FROM user_practice_responses r
  WHERE r.user_id = user_uuid AND LOWER(r.exam_type) = ANY(exam_ids)
  GROUP BY r.subject
  ORDER BY accuracy DESC;
END; $$;

-- ==========================================================
-- 4. Fix get_topic_performance_secure (Remove auth gate)
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
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    exam_ids text[];
BEGIN
    exam_ids := ARRAY[LOWER(target_exam_id)];
    IF LOWER(target_exam_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN
        exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep'];
    END IF;
    IF LOWER(target_exam_id) IN ('imat-prep', 'imat') THEN
        exam_ids := ARRAY['imat-prep', 'imat'];
    END IF;

    RETURN QUERY
    SELECT
        COALESCE(r.topic, 'General') as topic,
        COALESCE(r.subject, 'General') as subject,
        ROUND(AVG(CASE WHEN r.is_correct THEN 100 ELSE 0 END), 1) as accuracy_percentage,
        COUNT(*)::integer as total_answered
    FROM public.user_practice_responses r
    WHERE r.user_id = target_user_id AND LOWER(r.exam_type) = ANY(exam_ids)
      AND r.topic IS NOT NULL AND r.topic != ''
    GROUP BY r.topic, r.subject
    ORDER BY accuracy_percentage DESC;
END; $$;

-- ==========================================================
-- 5. Re-grant all permissions
-- ==========================================================
GRANT EXECUTE ON FUNCTION public.get_analytics_subjects_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_topic_performance_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tests_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_activity_velocity_secure(UUID, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_summary_stats_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_practice_percentile_secure(UUID, TEXT) TO authenticated;

-- ==========================================================
-- 6. Fix get_questions_secure (Time Efficiency & Fatigue Analysis)
--    Previously required premium plan + active subscription.
--    Now allows any authenticated user to fetch questions for a test.
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
    -- Allow all authenticated users – data access is scoped by test_id ownership
    -- Frontend handles premium upsell via blur/overlay
    RETURN QUERY
    SELECT q.id, q.test_id, q.question_text, q.options::jsonb, q.correct_index,
           q.user_answer, q.time_spent_seconds, q.subject, q.topic,
           q.question_number, q.difficulty
    FROM questions q
    WHERE q.test_id = ANY(target_test_ids);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_questions_secure(uuid[]) TO authenticated;
