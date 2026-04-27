-- Migration: Globalize Rankings (Remove Session Isolation)
-- Date: 2026-03-15
-- Purpose: Results page should show "best attempt of all time" for an exam type, avoiding isolation to specific live sessions.

CREATE OR REPLACE FUNCTION public.get_test_rankings(p_test_id UUID)
RETURNS TABLE (
    user_rank INTEGER,
    total_participants INTEGER,
    leaderboard JSONB
) AS $$
DECLARE
    v_test_record RECORD;
    v_user_rank INTEGER;
    v_total_participants INTEGER;
    v_leaderboard JSONB;
BEGIN
    -- Fetch the test record to get context
    SELECT t.session_id, t.user_id, t.is_ranked, t.exam_type, t.subject, t.test_type, t.is_mock
    INTO v_test_record
    FROM tests t
    WHERE t.id = p_test_id;

    -- If test not found, return nulls
    IF NOT FOUND THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::INTEGER, NULL::JSONB;
        RETURN;
    END IF;

    -- 1. Gather all "Best Attempts" globally for this exam configureation.
    -- We match on exam_type and test_type (and subject if applicable), ignoring session_id.
    WITH matching_tests AS (
        SELECT * FROM tests
        WHERE status = 'completed'
          AND exam_type = v_test_record.exam_type
          AND (
               test_type = v_test_record.test_type 
               OR (v_test_record.test_type = 'mock' AND is_mock = true)
               OR (v_test_record.is_mock = true AND test_type = 'mock')
          )
          AND (v_test_record.subject IS NULL OR subject = v_test_record.subject)
    ),
    best_attempts_list AS (
        SELECT DISTINCT ON (user_id)
            user_id, score, time_taken_seconds, id as test_id,
            correct_answers, wrong_answers, skipped_answers, total_questions
        FROM matching_tests
        ORDER BY user_id, score DESC, time_taken_seconds ASC
    ),
    ranked_candidates AS (
        SELECT
            user_id,
            score,
            time_taken_seconds,
            correct_answers,
            wrong_answers,
            skipped_answers,
            total_questions,
            RANK() OVER (ORDER BY score DESC, time_taken_seconds ASC) as official_rank
        FROM best_attempts_list
    )
    -- Calculate User Rank
    SELECT
        rc.official_rank INTO v_user_rank
    FROM ranked_candidates rc
    WHERE rc.user_id = v_test_record.user_id;

    -- Calculate Total Participants
    SELECT COUNT(*) INTO v_total_participants FROM best_attempts_list;

    -- Build Leaderboard (Top 10)
    SELECT jsonb_agg(
        jsonb_build_object(
            'rank', official_rank,
            'user_id', user_id,
            'display_name', COALESCE(p.display_name, 'Anonymous'),
            'avatar_url', p.avatar_url,
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
        SELECT rc.*
        FROM ranked_candidates rc
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

GRANT EXECUTE ON FUNCTION public.get_test_rankings(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_test_rankings(UUID) TO anon;
