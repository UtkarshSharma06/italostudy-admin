-- Fix: Overload get_mock_leaderboard to optionally scope by session_id
-- When p_session_id is provided, only returns that session's participants
-- When NULL, falls back to exam-wide leaderboard (backwards compatible)

CREATE OR REPLACE FUNCTION public.get_mock_leaderboard(
  p_exam_type TEXT,
  p_session_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
BEGIN
  WITH all_mock_tests AS (
    SELECT
      t.user_id,
      t.score,
      t.time_taken_seconds,
      t.correct_answers,
      t.wrong_answers,
      t.skipped_answers,
      t.total_questions,
      t.session_id
    FROM tests t
    WHERE t.status = 'completed'
      AND t.exam_type = p_exam_type
      AND (t.test_type = 'mock' OR t.is_mock = true)
      -- If session_id provided, scope to that session only; else include all
      AND (p_session_id IS NULL OR t.session_id = p_session_id)
  ),
  -- Pick best attempt per user: most correct answers, then fastest time
  best_per_user AS (
    SELECT DISTINCT ON (user_id)
      user_id, score, time_taken_seconds,
      correct_answers, wrong_answers, skipped_answers, total_questions
    FROM all_mock_tests
    ORDER BY user_id, correct_answers DESC, time_taken_seconds ASC
  ),
  -- Rank: most correct = rank 1; ties broken by speed
  ranked AS (
    SELECT
      *,
      RANK() OVER (ORDER BY correct_answers DESC, time_taken_seconds ASC) as rank
    FROM best_per_user
  )
  -- Return ALL participants ordered by rank
  SELECT jsonb_agg(
    jsonb_build_object(
      'rank', r.rank,
      'user_id', r.user_id,
      'display_name', COALESCE(p.display_name, 'Anonymous'),
      'avatar_url', p.avatar_url,
      'score', r.score,
      'correct_answers', r.correct_answers,
      'wrong_answers', r.wrong_answers,
      'skipped_answers', r.skipped_answers,
      'total_questions', r.total_questions
    ) ORDER BY r.rank ASC, r.time_taken_seconds ASC
  )
  INTO v_result
  FROM ranked r
  LEFT JOIN profiles p ON r.user_id = p.id;

  RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_mock_leaderboard(TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_mock_leaderboard(TEXT, UUID) TO anon;
