-- Fix get_champions_by_questions_solved function
-- Drop old version and recreate with correct signature

DROP FUNCTION IF EXISTS public.get_champions_by_questions_solved();
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
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH user_stats AS (
        SELECT 
            p.id AS user_id,
            p.display_name,
            p.avatar_url,
            COALESCE(target_exam_id, p.selected_exam) AS active_exam,
            COUNT(DISTINCT upr.id) AS total_attempts,
            COUNT(DISTINCT upr.question_id) AS unique_solved,
            COUNT(DISTINCT CASE WHEN upr.is_correct = true THEN upr.id END) AS correct_answers
        FROM 
            public.profiles p
        JOIN 
            public.user_practice_responses upr ON upr.user_id = p.id 
        WHERE 
            p.is_banned = false
            AND upr.is_correct IS NOT NULL
            AND (
                (target_exam_id IS NOT NULL AND upr.exam_type = target_exam_id) OR
                (target_exam_id IS NULL AND (upr.exam_type = p.selected_exam OR p.selected_exam IS NULL))
            )
        GROUP BY 
            p.id, p.display_name, p.avatar_url, active_exam
        HAVING 
            COUNT(DISTINCT upr.id) > 0
    ),
    exam_totals AS (
        SELECT 
            exam_type,
            COUNT(*) AS total_questions
        FROM 
            public.practice_questions
        GROUP BY 
            exam_type
    )
    SELECT 
        us.user_id,
        us.display_name,
        us.avatar_url,
        us.unique_solved AS questions_solved,
        COALESCE(et.total_questions, 0) AS total_questions,
        ROUND((us.correct_answers::NUMERIC / NULLIF(us.total_attempts, 0)) * 100, 1) AS accuracy,
        ROW_NUMBER() OVER (ORDER BY us.unique_solved DESC) AS rank_position
    FROM 
        user_stats us
    LEFT JOIN 
        exam_totals et ON et.exam_type = us.active_exam
    ORDER BY 
        questions_solved DESC
    LIMIT 10;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_champions_by_questions_solved(TEXT) TO anon;
