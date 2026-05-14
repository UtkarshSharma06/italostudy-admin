-- Migration: Add weekly filter to get_champions_by_questions_solved
-- Date: 2026-05-14
-- Purpose: Allow dashboards to show "Weekly Top Students" by passing since_date.
--          When since_date is NULL the function behaves exactly as before (all-time).

DROP FUNCTION IF EXISTS public.get_champions_by_questions_solved(TEXT);
DROP FUNCTION IF EXISTS public.get_champions_by_questions_solved(TEXT, TIMESTAMPTZ);

CREATE OR REPLACE FUNCTION public.get_champions_by_questions_solved(
    target_exam_id TEXT DEFAULT NULL,
    since_date     TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE (
    user_id         UUID,
    display_name    TEXT,
    avatar_url      TEXT,
    questions_solved BIGINT,
    total_questions  BIGINT,
    accuracy         NUMERIC,
    rank_position    BIGINT
)
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    exam_ids       TEXT[];
    active_exam_id TEXT;
BEGIN
    active_exam_id := LOWER(target_exam_id);
    exam_ids := ARRAY[active_exam_id];

    -- Exam alias normalisation (unchanged from previous version)
    IF active_exam_id IN ('cent-s-prep', 'cent-s', 'cens-prep') THEN
        exam_ids := ARRAY['cent-s-prep', 'cent-s', 'cens-prep'];
    END IF;
    IF active_exam_id IN ('imat-prep', 'imat') THEN
        exam_ids := ARRAY['imat-prep', 'imat'];
    END IF;

    RETURN QUERY
    WITH user_stats AS (
        SELECT
            p.id              AS u_id,
            p.display_name    AS d_name,
            p.avatar_url      AS a_url,
            COUNT(DISTINCT upr.question_id)                         AS unique_solved,
            COUNT(upr.id)                                           AS total_attempts,
            COUNT(upr.id) FILTER (WHERE upr.is_correct = true)      AS correct_answers
        FROM public.profiles p
        JOIN public.user_practice_responses upr ON upr.user_id = p.id
        WHERE
            p.is_banned = false
            AND LOWER(upr.exam_type) = ANY(exam_ids)
            -- Weekly filter: only apply when since_date is provided
            AND (since_date IS NULL OR upr.created_at >= since_date)
        GROUP BY p.id, p.display_name, p.avatar_url
    ),
    exam_totals AS (
        SELECT COUNT(*)::BIGINT AS total_questions
        FROM public.practice_questions
        WHERE LOWER(exam_type) = ANY(exam_ids)
    )
    SELECT
        us.u_id,
        us.d_name,
        us.a_url,
        us.unique_solved,
        COALESCE((SELECT et.total_questions FROM exam_totals et), 0),
        ROUND((us.correct_answers::NUMERIC / NULLIF(us.total_attempts, 0)) * 100, 1) AS accuracy,
        ROW_NUMBER() OVER (ORDER BY us.unique_solved DESC) AS rank_position
    FROM user_stats us
    ORDER BY unique_solved DESC
    LIMIT 10;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT, TIMESTAMPTZ) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT, TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT, TIMESTAMPTZ) TO anon;
