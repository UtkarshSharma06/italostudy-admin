-- Migration: 20260213000002_add_media_to_practice_and_session_questions.sql
-- Goal: Add 'media' support to practice, session, and snapshot questions

-- 1. Add media column to practice_questions
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practice_questions' AND column_name = 'media') THEN
        ALTER TABLE public.practice_questions ADD COLUMN media JSONB DEFAULT NULL;
        CREATE INDEX idx_practice_questions_media ON public.practice_questions USING GIN (media);
    END IF;
END $$;

-- 2. Add media column to session_questions
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'session_questions' AND column_name = 'media') THEN
        ALTER TABLE public.session_questions ADD COLUMN media JSONB DEFAULT NULL;
        CREATE INDEX idx_session_questions_media ON public.session_questions USING GIN (media);
    END IF;
END $$;

-- 3. Add media column to questions (snapshots)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'media') THEN
        ALTER TABLE public.questions ADD COLUMN media JSONB DEFAULT NULL;
        CREATE INDEX idx_questions_media ON public.questions USING GIN (media);
    END IF;
END $$;

-- 4. Update resolve_question_report RPC to handle media propagation
CREATE OR REPLACE FUNCTION public.resolve_question_report(
    p_report_id UUID,
    p_new_question_text TEXT,
    p_new_options JSONB,
    p_new_correct_index INTEGER,
    p_new_explanation TEXT,
    p_admin_message TEXT DEFAULT NULL,
    p_new_passage TEXT DEFAULT NULL,
    p_new_media JSONB DEFAULT NULL -- Added media parameter
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
            passage = p_new_passage,
            media = p_new_media, -- Update media
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
            passage = p_new_passage,
            media = p_new_media, -- Update media
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
        passage = p_new_passage,
        media = p_new_media, -- Update media
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
