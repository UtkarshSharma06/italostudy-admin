-- Migration: Add get_leaderboard RPC for global rankings
-- Date: 2026-01-20

CREATE OR REPLACE FUNCTION public.get_leaderboard(p_exam_id TEXT)
RETURNS TABLE (
    user_id UUID,
    display_name TEXT,
    avatar_url TEXT,
    total_score BIGINT,
    tests_taken BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.user_id,
        COALESCE(p.display_name, 'Anonymous') as display_name,
        p.avatar_url,
        SUM(COALESCE(t.correct_answers, 0))::BIGINT as total_score,
        COUNT(t.id)::BIGINT as tests_taken
    FROM tests t
    LEFT JOIN profiles p ON t.user_id = p.id
    WHERE t.status = 'completed' 
      AND t.exam_type = p_exam_id
    GROUP BY t.user_id, p.display_name, p.avatar_url
    ORDER BY total_score DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions needed for the dashboard
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT) TO service_role;
