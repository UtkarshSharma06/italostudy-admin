-- Migration: Fix Question Reporting Constraints and Resolution
-- Date: 2026-02-06
-- Purpose: Allow reporting from 'learning_quiz_questions' and handle its resolution in the RPC.

-- 1. Update source_table check constraint
ALTER TABLE public.question_reports 
DROP CONSTRAINT IF EXISTS question_reports_source_table_check;

ALTER TABLE public.question_reports 
ADD CONSTRAINT question_reports_source_table_check 
CHECK (source_table IN ('practice_questions', 'session_questions', 'learning_quiz_questions'));

-- 2. Update resolve_question_report RPC to handle learning_quiz_questions
CREATE OR REPLACE FUNCTION public.resolve_question_report(
    p_report_id UUID,
    p_new_question_text TEXT,
    p_new_options JSONB,
    p_new_correct_index INTEGER,
    p_new_explanation TEXT,
    p_admin_message TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    v_master_id UUID;
    v_source_table TEXT;
BEGIN
    -- Get report details
    SELECT master_question_id, source_table INTO v_master_id, v_source_table
    FROM public.question_reports
    WHERE id = p_report_id;

    -- Update Master Question in Source Table
    IF v_source_table = 'practice_questions' THEN
        UPDATE public.practice_questions
        SET 
            question_text = p_new_question_text,
            options = p_new_options,
            correct_index = p_new_correct_index,
            explanation = p_new_explanation,
            is_corrected = TRUE,
            corrected_at = timezone('utc'::text, now())
        WHERE id = v_master_id;
    ELSIF v_source_table = 'session_questions' THEN
        UPDATE public.session_questions
        SET 
            question_text = p_new_question_text,
            options = p_new_options,
            correct_index = p_new_correct_index,
            explanation = p_new_explanation,
            is_corrected = TRUE,
            corrected_at = timezone('utc'::text, now())
        WHERE id = v_master_id;
    ELSIF v_source_table = 'learning_quiz_questions' THEN
        UPDATE public.learning_quiz_questions
        SET 
            question_text = p_new_question_text,
            options = p_new_options,
            correct_index = p_new_correct_index,
            explanation = p_new_explanation,
            is_corrected = TRUE,
            corrected_at = timezone('utc'::text, now())
        WHERE id = v_master_id;
    END IF;

    -- Update all instances in the 'questions' (test runs) table
    -- If v_master_id is null (e.g. from learning where master_id wasn't passed initially), 
    -- we might need to skip this or handle it. 
    -- But ideally all reports have a master_question_id now.
    IF v_master_id IS NOT NULL THEN
        UPDATE public.questions
        SET 
            question_text = p_new_question_text,
            options = p_new_options,
            correct_index = p_new_correct_index,
            explanation = p_new_explanation,
            is_corrected = TRUE
        WHERE master_question_id = v_master_id AND source_table = v_source_table;
    END IF;

    -- Update Report Status
    UPDATE public.question_reports
    SET 
        status = 'resolved',
        admin_message = p_admin_message,
        updated_at = timezone('utc'::text, now())
    WHERE id = p_report_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
