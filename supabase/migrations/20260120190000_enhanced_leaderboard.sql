-- Migration: Enhanced Leaderboard for Live Mock Tests
-- Date: 2026-01-20
-- Purpose: Add ranking support and leaderboard RPC for mock test sessions

-- Add is_ranked column to tests table
-- This flag determines if the test attempt should be included in rankings
-- Only tests taken during live session windows by authenticated users are ranked
ALTER TABLE public.tests
ADD COLUMN IF NOT EXISTS is_ranked BOOLEAN DEFAULT true;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_tests_is_ranked ON public.tests(is_ranked);
CREATE INDEX IF NOT EXISTS idx_tests_session_score ON public.tests(session_id, score) WHERE is_ranked = true;

-- Create RPC function to get test rankings and leaderboard
-- Returns the user's rank and top 10 leaderboard for the same session
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
    -- Fetch the test record
    SELECT t.*, p.display_name, p.avatar_url
    INTO v_test_record
    FROM tests t
    LEFT JOIN profiles p ON t.user_id = p.id
    WHERE t.id = p_test_id;

    -- If test not found or not ranked, return nulls
    IF NOT FOUND OR v_test_record.is_ranked = false THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::INTEGER, NULL::JSONB;
        RETURN;
    END IF;

    -- Calculate user's rank (only among ranked tests in the same session)
    SELECT COUNT(*) + 1
    INTO v_user_rank
    FROM tests
    WHERE session_id = v_test_record.session_id
      AND is_ranked = true
      AND status = 'completed'
      AND score > v_test_record.score;

    -- Get total number of ranked participants in this session
    SELECT COUNT(*)
    INTO v_total_participants
    FROM tests
    WHERE session_id = v_test_record.session_id
      AND is_ranked = true
      AND status = 'completed';

    -- Build top 10 leaderboard
    SELECT jsonb_agg(
        jsonb_build_object(
            'rank', row_number,
            'user_id', user_id,
            'display_name', COALESCE(display_name, 'Anonymous'),
            'avatar_url', avatar_url,
            'score', score,
            'correct_answers', correct_answers,
            'time_taken_seconds', time_taken_seconds
        )
    )
    INTO v_leaderboard
    FROM (
        SELECT
            ROW_NUMBER() OVER (ORDER BY t.score DESC, t.time_taken_seconds ASC) as row_number,
            t.user_id,
            p.display_name,
            p.avatar_url,
            t.score,
            t.correct_answers,
            t.time_taken_seconds
        FROM tests t
        LEFT JOIN profiles p ON t.user_id = p.id
        WHERE t.session_id = v_test_record.session_id
          AND t.is_ranked = true
          AND t.status = 'completed'
        ORDER BY t.score DESC, t.time_taken_seconds ASC
        LIMIT 10
    ) top_10;

    RETURN QUERY SELECT v_user_rank, v_total_participants, COALESCE(v_leaderboard, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_test_rankings(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_test_rankings(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.get_test_rankings(UUID) TO service_role;

-- Update RLS policies to allow anonymous users to view mock sessions
-- (they need to see available tests but not other users' data)
DROP POLICY IF EXISTS "Anyone can view mock sessions" ON public.mock_sessions;
CREATE POLICY "Anyone can view mock sessions" ON public.mock_sessions
    FOR SELECT USING (true);

-- Allow anonymous users to create test records (for guest access)
-- But only for mock tests
DROP POLICY IF EXISTS "Users can create own tests" ON public.tests;
CREATE POLICY "Authenticated users can create own tests" ON public.tests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can create guest tests" ON public.tests
    FOR INSERT WITH CHECK (
        auth.uid() IS NULL 
        AND is_mock = true 
        AND is_ranked = false
    );

-- Allow anonymous users to update their own test records
-- We'll use a session-based approach or test_id as identifier
CREATE POLICY "Anonymous users can update guest tests" ON public.tests
    FOR UPDATE USING (
        auth.uid() IS NULL 
        AND is_mock = true 
        AND is_ranked = false
    );

-- Allow anonymous users to view their own test
CREATE POLICY "Anonymous users can view guest tests" ON public.tests
    FOR SELECT USING (
        (auth.uid() = user_id) OR
        (auth.uid() IS NULL AND is_mock = true)
    );

-- Similar adjustments for questions table
CREATE POLICY "Anonymous users can insert guest questions" ON public.questions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.tests 
            WHERE tests.id = questions.test_id 
            AND tests.is_mock = true
            AND (tests.user_id = auth.uid() OR (auth.uid() IS NULL AND tests.is_ranked = false))
        )
    );

CREATE POLICY "Anonymous users can update guest questions" ON public.questions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.tests 
            WHERE tests.id = questions.test_id 
            AND tests.is_mock = true
            AND (tests.user_id = auth.uid() OR (auth.uid() IS NULL AND tests.is_ranked = false))
        )
    );

CREATE POLICY "Anonymous users can view guest questions" ON public.questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tests 
            WHERE tests.id = questions.test_id 
            AND (tests.user_id = auth.uid() OR (auth.uid() IS NULL AND tests.is_mock = true))
        )
    );
