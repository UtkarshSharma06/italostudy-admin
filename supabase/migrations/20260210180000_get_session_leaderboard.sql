-- Update get_session_leaderboard to handle both IELTS (mock_exam_submissions) and other exams (tests)
CREATE OR REPLACE FUNCTION public.get_session_leaderboard(p_session_id UUID)
RETURNS TABLE (
    user_id UUID,
    display_name TEXT,
    avatar_url TEXT,
    score DECIMAL,
    accuracy DECIMAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
    v_exam_type TEXT;
BEGIN
    -- Get the exam type for this session
    SELECT exam_type INTO v_exam_type
    FROM public.mock_sessions
    WHERE id = p_session_id;

    IF v_exam_type = 'ielts-academic' THEN
        -- IELTS Logic
        RETURN QUERY
        SELECT 
            mes.user_id,
            COALESCE(p.display_name, 'Anonymous') as display_name,
            p.avatar_url,
            COALESCE(mes.overall_band, 0) as score, -- 0-9 Scale
            (COALESCE(mes.overall_band, 0) / 9.0) * 100 as accuracy -- Normalized to %
        FROM 
            public.mock_exam_submissions mes
        LEFT JOIN 
            public.profiles p ON mes.user_id = p.id
        WHERE 
            mes.session_id = p_session_id
        ORDER BY 
            mes.overall_band DESC NULLS LAST,
            mes.completed_at ASC NULLS LAST
        LIMIT 50;
    ELSE
        -- Standard Exams (CENT, IMAT, etc.) query 'tests' table
        RETURN QUERY
        SELECT 
            t.user_id,
            COALESCE(p.display_name, 'Anonymous') as display_name,
            p.avatar_url,
            COALESCE(t.score, 0)::DECIMAL as score, -- 0-100 Scale usually
            COALESCE(t.score, 0)::DECIMAL as accuracy -- 0-100 Scale
        FROM 
            public.tests t
        LEFT JOIN 
            public.profiles p ON t.user_id = p.id
        WHERE 
            t.session_id = p_session_id
            -- AND t.status = 'completed' -- Optional: include only completed if desired, or all for live tracking
        ORDER BY 
            t.score DESC NULLS LAST,
            t.time_taken_seconds ASC NULLS LAST
        LIMIT 50;
    END IF;
END;
$$;
