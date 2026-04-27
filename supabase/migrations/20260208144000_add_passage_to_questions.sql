-- Migration: 20260208144000_add_passage_to_questions.sql
-- Goal: Add optional 'passage' support to all question types

-- 1. Add passage column to learning_quiz_questions (Practice bank)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'learning_quiz_questions' AND column_name = 'passage') THEN
        ALTER TABLE public.learning_quiz_questions ADD COLUMN passage TEXT;
    END IF;
END $$;

-- 2. Add passage column to practice_questions (Manual practice bank)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practice_questions' AND column_name = 'passage') THEN
        ALTER TABLE public.practice_questions ADD COLUMN passage TEXT;
    END IF;
END $$;

-- 3. Add passage column to session_questions (Predefined mock questions)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'session_questions' AND column_name = 'passage') THEN
        ALTER TABLE public.session_questions ADD COLUMN passage TEXT;
    END IF;
END $$;

-- 4. Add passage column to questions (Active test/active session snapshots)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'passage') THEN
        ALTER TABLE public.questions ADD COLUMN passage TEXT;
    END IF;
END $$;

-- 5. Update resolve_question_report RPC to handle passage propagation
CREATE OR REPLACE FUNCTION public.resolve_question_report(
    p_report_id UUID,
    p_new_question_text TEXT,
    p_new_options JSONB,
    p_new_correct_index INTEGER,
    p_new_explanation TEXT,
    p_admin_message TEXT DEFAULT NULL,
    p_new_passage TEXT DEFAULT NULL -- Added passage parameter
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
            passage = p_new_passage, -- Update passage
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
            passage = p_new_passage, -- Update passage
            is_corrected = TRUE,
            corrected_at = timezone('utc'::text, now())
        WHERE id = v_master_id;
    END IF;

    -- Update all instances in the 'questions' (test runs) table
    UPDATE public.questions
    SET 
        question_text = p_new_question_text,
        options = p_new_options,
        correct_index = p_new_correct_index,
        explanation = p_new_explanation,
        passage = p_new_passage, -- Update passage
        is_corrected = TRUE
    WHERE master_question_id = v_master_id AND source_table = v_source_table;

    -- Update Report Status
    UPDATE public.question_reports
    SET 
        status = 'resolved',
        admin_message = p_admin_message,
        updated_at = timezone('utc'::text, now())
    WHERE id = p_report_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
