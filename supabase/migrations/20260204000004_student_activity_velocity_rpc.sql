-- Migration: Unified Student Activity Velocity RPC
-- Date: 2026-02-04

DROP FUNCTION IF EXISTS public.get_student_activity_velocity(UUID, TEXT, INTEGER) CASCADE;

CREATE OR REPLACE FUNCTION public.get_student_activity_velocity(
    target_user_id UUID,
    target_exam_id TEXT DEFAULT NULL,
    lookback_days INTEGER DEFAULT 7
)
RETURNS TABLE (
    activity_date DATE,
    score BIGINT,
    questions BIGINT,
    accuracy NUMERIC
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
    DECLARE
        exam_ids TEXT[];
    BEGIN
        -- Build exam_ids array to include legacy aliases
        exam_ids := ARRAY[target_exam_id];
        IF target_exam_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
        IF target_exam_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

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
            WHERE user_id = target_user_id
              AND (target_exam_id IS NULL OR exam_type = ANY(exam_ids))
            GROUP BY 1
        ),
        practice_activity AS (
            SELECT 
                created_at::DATE AS act_date,
                COUNT(*) FILTER (WHERE is_correct = true)::BIGINT AS correct_count,
                COUNT(*)::BIGINT AS total_count
            FROM public.user_practice_responses
            WHERE user_id = target_user_id
              AND (target_exam_id IS NULL OR exam_type = ANY(exam_ids))
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
            WHERE user_id = target_user_id
              AND (target_exam_id IS NULL OR true) -- Mocks are usually exam-wide
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
    FROM 
        date_range dr
    LEFT JOIN 
        combined_activity ca ON ca.act_date = dr.d
    GROUP BY 
        dr.d
    ORDER BY 
        dr.d ASC;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_student_activity_velocity(UUID, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_activity_velocity(UUID, TEXT, INTEGER) TO anon;
