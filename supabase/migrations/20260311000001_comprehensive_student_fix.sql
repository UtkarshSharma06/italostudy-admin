-- Migration: Comprehensive Student Data Fix (Unified)
-- Date: 2026-03-11
-- Purpose: Consolidate ALL student analytics fixes with full exam ID alias support.

-- ==========================================================
-- 1. Helper: check_has_premium_plan (Ensure it exists)
-- ==========================================================
DROP FUNCTION IF EXISTS public.check_has_premium_plan(TEXT);
CREATE OR REPLACE FUNCTION public.check_has_premium_plan(required_plan TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND (LOWER(selected_plan) = LOWER(required_plan) OR LOWER(selected_plan) = 'elite' OR role = 'admin' OR is_consultant = true)
  );
END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================================
-- 2. Fix get_analytics_subjects_secure
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
  exam_ids TEXT[];
BEGIN
  -- Build exam_ids array to include legacy aliases (case-insensitive)
  exam_ids := ARRAY[LOWER(exam_type_id)];
  IF LOWER(exam_type_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN 
    exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep']; 
  END IF;
  IF LOWER(exam_type_id) IN ('imat-prep', 'imat') THEN 
    exam_ids := ARRAY['imat-prep', 'imat']; 
  END IF;

  -- Get requester info
  SELECT role INTO requester_role FROM profiles WHERE id = auth.uid();
  SELECT LOWER(COALESCE(selected_plan, 'explorer')) INTO target_plan FROM profiles WHERE id = user_uuid;

  -- Logic: Admins/Self see everything. Others see based on target plan.
  IF requester_role = 'admin' OR auth.uid() = user_uuid OR target_plan != 'explorer' THEN
    subject_limit := 999;
  ELSE
    subject_limit := 2;
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
  ORDER BY accuracy DESC
  LIMIT subject_limit;
END; $$;

-- ==========================================================
-- 3. Fix get_topic_performance_secure
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
    -- Authorization Check
    IF auth.uid() = target_user_id OR public.check_has_premium_plan('pro') THEN
        exam_ids := ARRAY[LOWER(target_exam_id)];
        IF LOWER(target_exam_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN 
            exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep']; 
        END IF;
        IF LOWER(target_exam_id) IN ('imat-prep', 'imat') THEN 
            exam_ids := ARRAY['imat-prep', 'imat']; 
        END IF;

        RETURN QUERY
        SELECT 
            r.topic, 
            r.subject, 
            ROUND(AVG(CASE WHEN r.is_correct THEN 100 ELSE 0 END), 1)::numeric as accuracy_percentage,
            COUNT(*)::integer as total_answered
        FROM user_practice_responses r
        WHERE r.user_id = target_user_id
          AND LOWER(r.exam_type) = ANY(exam_ids)
        GROUP BY r.topic, r.subject;
    ELSE
        RETURN;
    END IF;
END; $$;

-- ==========================================================
-- 4. Fix get_tests_secure
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
    IF auth.uid() = user_uuid OR public.check_has_premium_plan('pro') THEN
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
    END IF;
END; $$;

-- ==========================================================
-- 5. New: get_student_practice_percentile_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_student_practice_percentile_secure(UUID, TEXT);
CREATE OR REPLACE FUNCTION public.get_student_practice_percentile_secure(
    target_user_id UUID,
    target_exam_id TEXT
)
RETURNS TABLE (
    unique_solved BIGINT,
    rank_position BIGINT,
    total_students BIGINT,
    percentile_top NUMERIC
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    user_solved_count BIGINT;
    user_rank BIGINT;
    total_student_count BIGINT;
    exam_ids TEXT[];
BEGIN
    exam_ids := ARRAY[LOWER(target_exam_id)];
    IF LOWER(target_exam_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN 
        exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep']; 
    END IF;
    IF LOWER(target_exam_id) IN ('imat-prep', 'imat') THEN 
        exam_ids := ARRAY['imat-prep', 'imat']; 
    END IF;

    SELECT COUNT(DISTINCT user_id) INTO total_student_count FROM public.user_practice_responses WHERE LOWER(exam_type) = ANY(exam_ids);
    SELECT COUNT(DISTINCT question_id) INTO user_solved_count FROM public.user_practice_responses WHERE user_id = target_user_id AND LOWER(exam_type) = ANY(exam_ids);

    WITH all_student_counts AS (
        SELECT user_id, COUNT(DISTINCT question_id) as solved_count
        FROM public.user_practice_responses WHERE LOWER(exam_type) = ANY(exam_ids) GROUP BY user_id
    ),
    ranked_students AS (
        SELECT user_id, solved_count, RANK() OVER (ORDER BY solved_count DESC) as rnk
        FROM all_student_counts
    )
    SELECT rnk INTO user_rank FROM ranked_students WHERE user_id = target_user_id;

    IF user_rank IS NULL THEN
        user_rank := total_student_count + 1;
        user_solved_count := 0;
        total_student_count := total_student_count + 1;
    END IF;

    RETURN QUERY SELECT user_solved_count, user_rank, total_student_count,
        ROUND((user_rank::NUMERIC / NULLIF(total_student_count, 0)) * 100, 1) as percentile_top;
END; $$;

-- ==========================================================
-- 6. New: get_student_activity_velocity_secure
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
    IF auth.uid() = user_uuid OR public.check_has_premium_plan('pro') THEN
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
            SELECT created_at::DATE AS act_date, SUM(COALESCE(correct_answers, 0))::BIGINT AS correct_count, SUM(COALESCE(total_questions, 0))::BIGINT AS total_count
            FROM public.tests WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids) GROUP BY 1
        ),
        practice_activity AS (
            SELECT created_at::DATE AS act_date, COUNT(*) FILTER (WHERE is_correct = true)::BIGINT AS correct_count, COUNT(*)::BIGINT AS total_count
            FROM public.user_practice_responses WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids) GROUP BY 1
        ),
        combined_activity AS (
            SELECT act_date, correct_count, total_count FROM test_activity
            UNION ALL
            SELECT act_date, correct_count, total_count FROM practice_activity
        )
        SELECT dr.d, COALESCE(SUM(ca.correct_count), 0)::BIGINT as score, COALESCE(SUM(ca.total_count), 0)::BIGINT as questions,
               CASE WHEN SUM(ca.total_count) > 0 THEN ROUND((SUM(ca.correct_count)::NUMERIC / NULLIF(SUM(ca.total_count), 0)) * 100, 1) ELSE 0 END as accuracy
        FROM date_range dr LEFT JOIN combined_activity ca ON ca.act_date = dr.d GROUP BY dr.d ORDER BY dr.d ASC;
    END IF;
END; $$;

-- ==========================================================
-- 7. Grant Permissions
-- ==========================================================
GRANT EXECUTE ON FUNCTION public.get_analytics_subjects_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_topic_performance_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tests_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_questions_secure(UUID[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_practice_percentile_secure(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_activity_velocity_secure(UUID, TEXT, INTEGER) TO authenticated;

-- ==========================================================
-- 8. New: get_student_summary_stats_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_student_summary_stats_secure(UUID, TEXT);
CREATE OR REPLACE FUNCTION public.get_student_summary_stats_secure(
    user_uuid UUID,
    exam_type_id TEXT
)
RETURNS TABLE (
    accuracy_percent NUMERIC,
    time_spent_hours NUMERIC,
    verified_skills_percent NUMERIC,
    percentile_top NUMERIC,
    total_solved INTEGER,
    global_rank BIGINT
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    exam_ids TEXT[];
    practice_correct BIGINT;
    practice_total BIGINT;
    mock_correct BIGINT;
    mock_total BIGINT;
    mock_time_seconds BIGINT;
    total_time_seconds BIGINT;
    verified_skills_count INTEGER;
    total_subjects_count INTEGER;
    total_student_count BIGINT;
    user_rank BIGINT;
    user_solved_count BIGINT;
BEGIN
    exam_ids := ARRAY[LOWER(exam_type_id)];
    IF LOWER(exam_type_id) IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep']; END IF;
    IF LOWER(exam_type_id) IN ('imat-prep', 'imat') THEN exam_ids := ARRAY['imat-prep', 'imat']; END IF;

    -- 1. Practice Stats
    SELECT 
        COUNT(*) FILTER (WHERE is_correct = true),
        COUNT(*)
    INTO practice_correct, practice_total
    FROM public.user_practice_responses 
    WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids);

    -- 2. Mock Stats
    SELECT 
        SUM(COALESCE(correct_answers, 0)),
        SUM(COALESCE(total_questions, 0)),
        SUM(GREATEST(0, (COALESCE(time_limit_minutes, 0) * 60) - COALESCE(time_remaining_seconds, 0)))
    INTO mock_correct, mock_total, mock_time_seconds
    FROM public.tests 
    WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids) AND (is_mock = true OR test_type = 'mock') AND status = 'completed';

    -- 3. Time Spent: Mock Time + Practice Estimate (60s/q)
    total_time_seconds := COALESCE(mock_time_seconds, 0) + (COALESCE(practice_total, 0) * 60);
    time_spent_hours := ROUND(total_time_seconds::NUMERIC / 3600, 1);

    -- 4. Accuracy
    accuracy_percent := ROUND((COALESCE(practice_correct, 0) + COALESCE(mock_correct, 0))::NUMERIC / 
                        NULLIF(COALESCE(practice_total, 0) + COALESCE(mock_total, 0), 0) * 100, 1);

    -- 5. Verified Skills (Subjects with >= 10 questions and >= 70% accuracy)
    WITH subject_accuracy AS (
        SELECT 
            subject,
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE is_correct = true) as correct
        FROM public.user_practice_responses 
        WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids)
        GROUP BY subject
    )
    SELECT 
        COUNT(*) FILTER (WHERE total >= 10 AND (correct::NUMERIC / total) >= 0.7),
        COUNT(*)
    INTO verified_skills_count, total_subjects_count
    FROM subject_accuracy;

    verified_skills_percent := ROUND(COALESCE(verified_skills_count, 0)::NUMERIC / NULLIF(total_subjects_count, 0) * 100, 1);

    -- 6. Percentile (Same logic as rank)
    SELECT COUNT(DISTINCT user_id) INTO total_student_count FROM public.user_practice_responses WHERE LOWER(exam_type) = ANY(exam_ids);
    SELECT COUNT(DISTINCT question_id) INTO user_solved_count FROM public.user_practice_responses WHERE user_id = user_uuid AND LOWER(exam_type) = ANY(exam_ids);

    WITH all_student_counts AS (
        SELECT user_id, COUNT(DISTINCT question_id) as solved_count
        FROM public.user_practice_responses WHERE LOWER(exam_type) = ANY(exam_ids) GROUP BY user_id
    ),
    ranked_students AS (
        SELECT user_id, solved_count, RANK() OVER (ORDER BY solved_count DESC) as rnk
        FROM all_student_counts
    )
    SELECT rnk INTO user_rank FROM ranked_students WHERE user_id = user_uuid;

    IF user_rank IS NULL THEN
        user_rank := total_student_count + 1;
        total_student_count := total_student_count + 1;
    END IF;

    percentile_top := ROUND((user_rank::NUMERIC / NULLIF(total_student_count, 0)) * 100, 1);
    total_solved := user_solved_count::INTEGER;

    RETURN QUERY SELECT 
        COALESCE(accuracy_percent, 0), 
        COALESCE(time_spent_hours, 0), 
        COALESCE(verified_skills_percent, 0), 
        COALESCE(percentile_top, 100),
        COALESCE(total_solved, 0),
        COALESCE(user_rank, (total_student_count + 1));
END; $$;

GRANT EXECUTE ON FUNCTION public.get_student_summary_stats_secure(UUID, TEXT) TO authenticated;
-- ==========================================================
-- 8. Fix get_champions_by_questions_solved (Case-Insensitive)
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_champions_by_questions_solved(TEXT);
CREATE OR REPLACE FUNCTION public.get_champions_by_questions_solved(target_exam_id TEXT DEFAULT NULL)
RETURNS TABLE (
    user_id UUID,
    display_name TEXT,
    avatar_url TEXT,
    questions_solved BIGINT,
    total_questions BIGINT,
    accuracy NUMERIC,
    rank_position BIGINT
) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    exam_ids TEXT[];
    active_exam_id TEXT;
BEGIN
    active_exam_id := LOWER(target_exam_id);
    exam_ids := ARRAY[active_exam_id];
    IF active_exam_id IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep']; END IF;
    IF active_exam_id IN ('imat-prep', 'imat') THEN exam_ids := ARRAY['imat-prep', 'imat']; END IF;

    RETURN QUERY
    WITH user_stats AS (
        SELECT 
            p.id AS u_id,
            p.display_name as d_name,
            p.avatar_url as a_url,
            COUNT(DISTINCT upr.question_id) AS unique_solved,
            COUNT(upr.id) as total_attempts,
            COUNT(upr.id) FILTER (WHERE upr.is_correct = true) as correct_answers
        FROM public.profiles p
        JOIN public.user_practice_responses upr ON upr.user_id = p.id 
        WHERE p.is_banned = false AND LOWER(upr.exam_type) = ANY(exam_ids)
        GROUP BY p.id, p.display_name, p.avatar_url
    ),
    exam_totals AS (
        SELECT COUNT(*)::BIGINT AS total_questions
        FROM public.practice_questions WHERE LOWER(exam_type) = ANY(exam_ids)
    )
    SELECT 
        us.u_id, us.d_name, us.a_url, us.unique_solved,
        COALESCE((SELECT et.total_questions FROM exam_totals et), 0),
        ROUND((us.correct_answers::NUMERIC / NULLIF(us.total_attempts, 0)) * 100, 1) AS accuracy,
        ROW_NUMBER() OVER (ORDER BY us.unique_solved DESC) AS rank_position
    FROM user_stats us ORDER BY unique_solved DESC LIMIT 10;
END; $$;

GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT) TO authenticated;
