-- Migration: Harden RPC Security to prevent Inspect Element bypassing
-- Date: 2026-03-09
-- Purpose: Restrict self-view data for non-premium users in analytics RPCs.

-- ==========================================================
-- 1. Harden get_analytics_subjects_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_analytics_subjects_secure(UUID, TEXT);

CREATE OR REPLACE FUNCTION public.get_analytics_subjects_secure(
  user_uuid UUID,
  exam_type_id TEXT
)
RETURNS TABLE (
  subject TEXT,
  total_questions INTEGER,
  correct_answers INTEGER,
  accuracy NUMERIC,
  color TEXT
) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  requester_plan TEXT;
  is_admin BOOLEAN;
  subject_limit INTEGER;
  exam_ids TEXT[];
BEGIN
  -- Get requester info
  SELECT 
    LOWER(COALESCE(selected_plan, 'explorer')),
    COALESCE(role = 'admin', FALSE)
  INTO requester_plan, is_admin
  FROM profiles WHERE id = auth.uid();

  -- HARD LIMIT: Only Global/Elite/Pro see more than 2 subjects, 
  -- EVEN for themselves. This prevents unblurring in the browser.
  IF is_admin OR requester_plan IN ('pro', 'elite', 'global', 'global admission plan') THEN
    subject_limit := 999;
  ELSE
    subject_limit := 2;
  END IF;

  -- Build exam_ids array to include legacy aliases
  exam_ids := ARRAY[exam_type_id];
  IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
  IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;
  
  RETURN QUERY
  WITH subject_colors AS (
    SELECT UNNEST(ARRAY['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']) AS color_value,
           generate_series(0, 4) AS color_idx
  )
  SELECT 
    up.subject,
    COUNT(*)::INTEGER AS total_questions,
    COUNT(*) FILTER (WHERE up.is_correct = TRUE)::INTEGER AS correct_answers,
    ROUND((COUNT(*) FILTER (WHERE up.is_correct = TRUE)::NUMERIC / NULLIF(COUNT(*), 0) * 100), 1) AS accuracy,
    sc.color_value AS color
  FROM user_practice_responses up
  CROSS JOIN subject_colors sc
  WHERE up.user_id = user_uuid
    AND up.exam_type = ANY(exam_ids)
  GROUP BY up.subject, sc.color_value, sc.color_idx
  ORDER BY total_questions DESC
  LIMIT subject_limit;
END; $$;

-- ==========================================================
-- 2. Harden get_tests_secure
-- ==========================================================
DROP FUNCTION IF EXISTS public.get_tests_secure(uuid, text);

CREATE OR REPLACE FUNCTION public.get_tests_secure(
    user_uuid uuid,
    exam_type_id text
)
RETURNS TABLE (
    id uuid,
    test_type text,
    status text,
    correct_answers integer,
    wrong_answers integer,
    skipped_answers integer,
    total_questions integer,
    time_limit_minutes integer,
    time_remaining_seconds integer,
    created_at timestamptz,
    exam_type text,
    is_mock boolean,
    score numeric,
    penalty_score numeric
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    caller_id uuid := auth.uid();
    caller_plan TEXT;
    is_admin BOOLEAN;
    exam_ids text[];
    test_limit INTEGER;
BEGIN
    -- Get caller info
    SELECT 
      LOWER(COALESCE(selected_plan, 'explorer')),
      COALESCE(role = 'admin', FALSE)
    INTO caller_plan, is_admin
    FROM profiles WHERE id = caller_id;

    -- HARD LIMIT: Non-premium callers (even self) only see last 3 tests.
    IF is_admin OR caller_plan IN ('pro', 'elite', 'global', 'global admission plan') THEN
        test_limit := 100;
    ELSE
        test_limit := 3;
    END IF;

    exam_ids := ARRAY[exam_type_id];
    IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
    IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

    RETURN QUERY
        SELECT t.id, 
               COALESCE(t.test_type, 'practice'), 
               t.status, 
               COALESCE(t.correct_answers, 0), 
               COALESCE(t.wrong_answers, 0),
               COALESCE(t.skipped_answers, 0), 
               COALESCE(t.total_questions, 0), 
               COALESCE(t.time_limit_minutes, 0), 
               COALESCE(t.time_remaining_seconds, 0),
               t.created_at, 
               t.exam_type, 
               COALESCE(t.is_mock, false), 
               COALESCE(t.score, 0)::numeric, 
               COALESCE(t.penalty_score, 0)::numeric
        FROM tests t
        WHERE t.user_id = user_uuid
          AND t.exam_type = ANY(exam_ids)
        ORDER BY t.created_at DESC
        LIMIT test_limit;
END; $$;
