-- Migration: Add get_tests_secure RPC
-- Purpose: Allow authorized users (admin/global plan) to read test history for any user.
-- This bypasses the default RLS which only allows users to see their own tests.
-- The function uses SECURITY DEFINER so it runs with the owner's permissions.

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
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    caller_id uuid;
    caller_plan text;
    exam_ids text[];
BEGIN
    -- Get the calling user's ID
    caller_id := auth.uid();

    -- Allow if viewing own data
    IF caller_id = user_uuid THEN
        -- Build exam_ids array to include legacy aliases
        exam_ids := ARRAY[exam_type_id];
        IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
        IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

        RETURN QUERY
            SELECT t.id, t.test_type, t.status, t.correct_answers, t.wrong_answers,
                   t.skipped_answers, t.total_questions, t.time_limit_minutes, t.time_remaining_seconds,
                   t.created_at, t.exam_type, t.is_mock, t.score, t.penalty_score
            FROM tests t
            WHERE t.user_id = user_uuid
              AND t.exam_type = ANY(exam_ids)
            ORDER BY t.created_at DESC
            LIMIT 100;
        RETURN;
    END IF;

    -- For viewing others: check caller is admin or on global/elite plan
    SELECT selected_plan INTO caller_plan
    FROM profiles
    WHERE id = caller_id;

    IF caller_plan IN ('global', 'elite', 'admin') THEN
        exam_ids := ARRAY[exam_type_id];
        IF exam_type_id = 'cent-s-prep' THEN exam_ids := array_append(exam_ids, 'cent-s'); END IF;
        IF exam_type_id = 'imat-prep' THEN exam_ids := array_append(exam_ids, 'imat'); END IF;

        RETURN QUERY
            SELECT t.id, t.test_type, t.status, t.correct_answers, t.wrong_answers,
                   t.skipped_answers, t.total_questions, t.time_limit_minutes, t.time_remaining_seconds,
                   t.created_at, t.exam_type, t.is_mock, t.score, t.penalty_score
            FROM tests t
            WHERE t.user_id = user_uuid
              AND t.exam_type = ANY(exam_ids)
            ORDER BY t.created_at DESC
            LIMIT 100;
    ELSE
        -- Non-authorized viewer: return empty result set (no data leakage)
        RETURN;
    END IF;
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.get_tests_secure(uuid, text) TO authenticated;

COMMENT ON FUNCTION public.get_tests_secure IS 
'Securely fetch test history for a given user. 
Authorized viewers (own data, or global/elite/admin plan) can access full history. 
Others receive an empty result set.';
