-- Migration: Refine Ranking Logic
-- Date: 2026-01-27
-- Purpose: Only count the 1st attempt per user for session rankings and use time as a tiebreaker.

CREATE OR REPLACE FUNCTION public.get_test_rankings(p_test_id UUID)
RETURNS TABLE (
    user_rank INTEGER,
    total_participants INTEGER,
    leaderboard JSONB
) AS $$
DECLARE
    v_test_record RECORD;
    v_session_id UUID;
    v_user_rank INTEGER;
    v_total_participants INTEGER;
    v_leaderboard JSONB;
BEGIN
    -- Fetch the test record to get session_id and user_id
    SELECT t.session_id, t.user_id, t.is_ranked
    INTO v_test_record
    FROM tests t
    WHERE t.id = p_test_id;

    -- If test not found or not ranked, return nulls
    IF NOT FOUND OR v_test_record.is_ranked = false OR v_test_record.session_id IS NULL THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::INTEGER, NULL::JSONB;
        RETURN;
    END IF;

    v_session_id := v_test_record.session_id;

    -- 1. Get the list of canonical "First Attempts" for all users in this session
    -- We use DISTINCT ON (user_id) ordered by created_at to get the very first attempt.
    -- Then we rank these candidates by score DESC and time_taken_seconds ASC.
    
    WITH ranked_candidates AS (
        SELECT 
            user_id,
            score,
            time_taken_seconds,
            id as test_id,
            ROW_NUMBER() OVER (ORDER BY score DESC, time_taken_seconds ASC) as official_rank
        FROM (
            SELECT DISTINCT ON (user_id) 
                user_id, score, time_taken_seconds, id
            FROM tests
            WHERE session_id = v_session_id
              AND status = 'completed'
              AND is_ranked = true
            ORDER BY user_id, created_at ASC
        ) as first_attempts
    )
    SELECT 
        official_rank INTO v_user_rank
    FROM ranked_candidates
    WHERE user_id = v_test_record.user_id;

    -- If the current user doesn't have a ranked attempt (e.g. they are guest or something went wrong), v_user_rank will be null.
    -- But since we are looking at p_test_id, they must have at least one attempt.

    -- 2. Total participants (unique users who completed at least one ranked test)
    SELECT COUNT(DISTINCT user_id)
    INTO v_total_participants
    FROM tests
    WHERE session_id = v_session_id
      AND status = 'completed'
      AND is_ranked = true;

    -- 3. Top 10 Leaderboard (based on First Attempts only)
    SELECT jsonb_agg(
        jsonb_build_object(
            'rank', official_rank,
            'user_id', user_id,
            'display_name', COALESCE(p.display_name, 'Anonymous'),
            'avatar_url', p.avatar_url,
            'score', score,
            'time_taken_seconds', time_taken_seconds
        )
    )
    INTO v_leaderboard
    FROM (
        SELECT 
            rc.official_rank,
            rc.user_id,
            rc.score,
            rc.time_taken_seconds
        FROM (
            SELECT 
                user_id, score, time_taken_seconds,
                ROW_NUMBER() OVER (ORDER BY score DESC, time_taken_seconds ASC) as official_rank
            FROM (
                SELECT DISTINCT ON (user_id) 
                    user_id, score, time_taken_seconds
                FROM tests
                WHERE session_id = v_session_id
                  AND status = 'completed'
                  AND is_ranked = true
                ORDER BY user_id, created_at ASC
            ) as first_attempts
        ) as rc
        ORDER BY rc.official_rank ASC
        LIMIT 10
    ) top_candidates
    LEFT JOIN profiles p ON top_candidates.user_id = p.id;

    RETURN QUERY SELECT 
        COALESCE(v_user_rank, 0), 
        COALESCE(v_total_participants, 0), 
        COALESCE(v_leaderboard, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
