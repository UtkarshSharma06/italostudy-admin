-- Migration: Add Advanced Analytics Secure RPCs
-- Date: 2026-03-06
-- Purpose: Allow authorized viewers (admins/global plan) to see detailed mock analysis data.

-- 1. Get Questions Securely
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
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if requester is Admin or high-tier
    IF public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid()) THEN
        RETURN QUERY
        SELECT q.id, q.test_id, q.question_text, q.options::jsonb, q.correct_index, 
               q.user_answer, q.time_spent_seconds, q.subject, q.topic, 
               q.question_number, q.difficulty
        FROM questions q
        WHERE q.test_id = ANY(target_test_ids);
    ELSE
        RETURN;
    END IF;
END;
$$;

-- 2. Get Topic Performance Securely
CREATE OR REPLACE FUNCTION public.get_topic_performance_secure(
    target_user_id uuid,
    target_exam_id text
)
RETURNS TABLE (
    topic text,
    subject text,
    accuracy_percentage numeric,
    total_answered integer,
    avg_time_seconds numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if requester is Admin or high-tier
    IF public.check_has_premium_plan('pro') AND public.check_subscription_active(auth.uid()) THEN
        RETURN QUERY
        SELECT tp.topic, tp.subject, tp.accuracy_percentage, tp.total_answered, tp.avg_time_seconds
        FROM topic_performance tp
        WHERE tp.user_id = target_user_id
          AND tp.exam_type = target_exam_id;
    ELSE
        RETURN;
    END IF;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_questions_secure(uuid[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_topic_performance_secure(uuid, text) TO authenticated;

COMMENT ON FUNCTION public.get_questions_secure IS 'Securely fetch questions for non-self users (Admin/Global only)';
COMMENT ON FUNCTION public.get_topic_performance_secure IS 'Securely fetch topic mastery for non-self users (Admin/Global only)';
