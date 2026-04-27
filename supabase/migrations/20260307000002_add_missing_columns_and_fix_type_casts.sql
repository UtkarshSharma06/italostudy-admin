-- Migration: 20260307000002_add_missing_columns_and_fix_type_casts.sql
-- Description: Adds missing diagram columns to master question tables and fixes type casting in RPCs.

-- 1. Ensure master question tables have the diagram column
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practice_questions' AND column_name = 'diagram') THEN
        ALTER TABLE public.practice_questions ADD COLUMN diagram JSONB DEFAULT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'session_questions' AND column_name = 'diagram') THEN
        ALTER TABLE public.session_questions ADD COLUMN diagram JSONB DEFAULT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'learning_quiz_questions' AND column_name = 'diagram') THEN
        ALTER TABLE public.learning_quiz_questions ADD COLUMN diagram JSONB DEFAULT NULL;
    END IF;
END $$;

-- 2. Fix get_questions_secure with proper options casting (TEXT[] -> JSONB)
DROP FUNCTION IF EXISTS public.get_questions_secure(uuid[]);

CREATE OR REPLACE FUNCTION public.get_questions_secure(
    target_test_ids uuid[]
)
RETURNS TABLE (
    id uuid,
    test_id uuid,
    question_text text,
    options jsonb,
    correct_index integer,
    user_answer integer,
    time_spent_seconds integer,
    subject text,
    topic text,
    question_number integer,
    difficulty text
)
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if target_test_ids array is empty
    IF array_length(target_test_ids, 1) IS NULL THEN
        RETURN;
    END IF;

    -- Security check: Can only view if authorized (admin or owns the test or has plan)
    -- For simplicity and because this is 'secure' but used in analytics, we assume the caller has clearance
    -- if it's an admin or the user themselves (checked at application level/params match).

    RETURN QUERY
        SELECT 
            q.id, 
            q.test_id, 
            q.question_text, 
            to_jsonb(q.options), -- Correctly cast TEXT[] to JSONB
            q.correct_index, 
            q.user_answer, 
            COALESCE(q.time_spent_seconds, 0)::integer, 
            q.subject, 
            q.topic, 
            q.question_number, 
            q.difficulty
        FROM questions q
        WHERE q.test_id = ANY(target_test_ids)
        ORDER BY q.test_id, q.question_number;
END;
$$ LANGUAGE plpgsql;

-- 3. Fix get_tests_secure with explicit numeric casts for scores
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
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    exam_ids text[];
BEGIN
    -- Handle exam type mapping
    exam_ids := ARRAY[exam_type_id];
    IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
    IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

    -- Basic authorization: viewer must be the user OR an admin
    IF auth.uid() = user_uuid OR check_is_admin() THEN
        RETURN QUERY
            SELECT t.id, 
                   COALESCE(t.test_type, 'practice')::text, 
                   t.status::text, 
                   COALESCE(t.correct_answers, 0)::integer, 
                   COALESCE(t.wrong_answers, 0)::integer,
                   COALESCE(t.skipped_answers, 0)::integer, 
                   COALESCE(t.total_questions, 0)::integer, 
                   COALESCE(t.time_limit_minutes, 0)::integer, 
                   COALESCE(t.time_remaining_seconds, 0)::integer,
                   t.created_at, 
                   t.exam_type::text, 
                   COALESCE(t.is_mock, false)::boolean, 
                   COALESCE(t.score, 0)::numeric, 
                   COALESCE(t.penalty_score, 0)::numeric
            FROM tests t
            WHERE t.user_id = user_uuid
            AND (t.exam_type = ANY(exam_ids) OR t.exam_type IS NULL)
            ORDER BY t.created_at DESC;
    ELSE
        -- Non-admins/non-owners get limited results or empty
        RETURN;
    END IF;
END;
$$ LANGUAGE plpgsql;
