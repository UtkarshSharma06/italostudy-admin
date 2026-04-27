-- Migration: Finalize Ranking Logic and Data
-- Date: 2026-02-06
-- Purpose: Include detail counts (correct, wrong, skipped) and ensure strictly sorted leaderboard aggregation.

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

    -- 1. Get the list of canonical "Best Attempts" for all users in this session
    -- We use DISTINCT ON (user_id) ordered by score DESC, time_taken_seconds ASC
    -- to get the highest score (and fastest time for ties).
    
    WITH best_attempts_list AS (
        SELECT DISTINCT ON (user_id) 
            user_id, score, time_taken_seconds, id as test_id,
            correct_answers, wrong_answers, skipped_answers, total_questions
        FROM tests
        WHERE session_id = v_session_id
          AND status = 'completed'
          AND is_ranked = true
        ORDER BY user_id, score DESC, time_taken_seconds ASC
    ),
    ranked_candidates AS (
        SELECT 
            user_id,
            score,
            time_taken_seconds,
            test_id,
            correct_answers,
            wrong_answers,
            skipped_answers,
            total_questions,
            ROW_NUMBER() OVER (ORDER BY score DESC, time_taken_seconds ASC) as official_rank
        FROM best_attempts_list
    )
    SELECT 
        official_rank INTO v_user_rank
    FROM ranked_candidates
    WHERE user_id = v_test_record.user_id;

    -- 2. Total participants
    SELECT COUNT(DISTINCT user_id)
    INTO v_total_participants
    FROM tests
    WHERE session_id = v_session_id
      AND status = 'completed'
      AND is_ranked = true;

    -- 3. Top 10 Leaderboard
    SELECT jsonb_agg(
        jsonb_build_object(
            'rank', official_rank,
            'user_id', user_id,
            'display_name', COALESCE(display_name, 'Anonymous'),
            'avatar_url', avatar_url,
            'score', score,
            'time_taken_seconds', time_taken_seconds,
            'correct_answers', correct_answers,
            'wrong_answers', wrong_answers,
            'skipped_answers', skipped_answers,
            'total_questions', total_questions
        ) ORDER BY official_rank ASC
    )
    INTO v_leaderboard
    FROM (
        SELECT 
            rc.official_rank,
            rc.user_id,
            rc.score,
            rc.time_taken_seconds,
            rc.correct_answers,
            rc.wrong_answers,
            rc.skipped_answers,
            rc.total_questions,
            p.display_name,
            p.avatar_url
        FROM ranked_candidates rc
        LEFT JOIN profiles p ON rc.user_id = p.id
        ORDER BY rc.official_rank ASC
        LIMIT 10
    ) top_candidates;

    RETURN QUERY SELECT 
        COALESCE(v_user_rank, 0), 
        COALESCE(v_total_participants, 0), 
        COALESCE(v_leaderboard, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
