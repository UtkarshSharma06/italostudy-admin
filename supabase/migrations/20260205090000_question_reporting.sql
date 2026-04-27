-- Migration: 20260205090000_question_reporting.sql
-- Goal: Support user-reported questions, admin corrections, and site-wide propagation

-- 1. Create Question Reports Table
CREATE TABLE IF NOT EXISTS public.question_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    question_id UUID NOT NULL, -- The specific instance ID in the 'questions' table
    master_question_id UUID NOT NULL, -- ID of the original question in practice_questions or session_questions
    source_table TEXT NOT NULL CHECK (source_table IN ('practice_questions', 'session_questions')),
    reason TEXT NOT NULL,
    admin_message TEXT, -- Notes from admin to the user
    is_seen_by_user BOOLEAN DEFAULT FALSE, -- Track if user has seen the resolution on dashboard
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for question_reports
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;

-- Users can insert their own reports
DROP POLICY IF EXISTS "Users can insert own question reports" ON public.question_reports;
CREATE POLICY "Users can insert own question reports"
    ON public.question_reports
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can view their own reports
DROP POLICY IF EXISTS "Users can view own question reports" ON public.question_reports;
CREATE POLICY "Users can view own question reports"
    ON public.question_reports
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Users can update their own reports (e.g., to mark as seen)
DROP POLICY IF EXISTS "Users can update own question reports" ON public.question_reports;
CREATE POLICY "Users can update own question reports"
    ON public.question_reports
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins can update any report
DROP POLICY IF EXISTS "Admins can update all question reports" ON public.question_reports;
CREATE POLICY "Admins can update all question reports"
    ON public.question_reports
    FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- 2. Enhance Practice and Session Questions
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practice_questions' AND column_name = 'is_corrected') THEN
        ALTER TABLE public.practice_questions ADD COLUMN is_corrected BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'practice_questions' AND column_name = 'corrected_at') THEN
        ALTER TABLE public.practice_questions ADD COLUMN corrected_at TIMESTAMP WITH TIME ZONE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'session_questions' AND column_name = 'is_corrected') THEN
        ALTER TABLE public.session_questions ADD COLUMN is_corrected BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'session_questions' AND column_name = 'corrected_at') THEN
        ALTER TABLE public.session_questions ADD COLUMN corrected_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- 3. Enhance Test Run Questions (Snapshots)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'master_question_id') THEN
        ALTER TABLE public.questions ADD COLUMN master_question_id UUID;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'source_table') THEN
        ALTER TABLE public.questions ADD COLUMN source_table TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'is_corrected') THEN
        ALTER TABLE public.questions ADD COLUMN is_corrected BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- 4. Enhance Bookmarks
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookmarked_questions' AND column_name = 'is_reported_by_user') THEN
        ALTER TABLE public.bookmarked_questions ADD COLUMN is_reported_by_user BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- 5. RPC for Resolving Reports and Propagating Changes
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
    END IF;

    -- Update all instances in the 'questions' (test runs) table
    UPDATE public.questions
    SET 
        question_text = p_new_question_text,
        options = p_new_options,
        correct_index = p_new_correct_index,
        explanation = p_new_explanation,
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

-- Grant permissions for RPC
REVOKE EXECUTE ON FUNCTION public.resolve_question_report FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.resolve_question_report TO authenticated;
