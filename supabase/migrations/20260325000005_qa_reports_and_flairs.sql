-- Migration: Add Admin Flairs and Reporting System to Q&A

-- 1. Add admin_flair to questions and answers
ALTER TABLE public.qa_questions ADD COLUMN IF NOT EXISTS admin_flair TEXT;
ALTER TABLE public.qa_answers ADD COLUMN IF NOT EXISTS admin_flair TEXT;

-- 2. Create the QA Reports table
CREATE TABLE IF NOT EXISTS public.qa_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_id UUID NOT NULL,
    target_type TEXT NOT NULL CHECK (target_type IN ('question', 'answer')),
    reason TEXT NOT NULL,
    custom_note TEXT,
    target_preview TEXT, -- Snippet of the reported content for quick admin review
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed', 'deleted')),
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Setup RLS for the reports
ALTER TABLE public.qa_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert reports" ON public.qa_reports;
CREATE POLICY "Users can insert reports" ON public.qa_reports 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);

DROP POLICY IF EXISTS "Admins can view and update reports" ON public.qa_reports;
CREATE POLICY "Admins can view and update reports" ON public.qa_reports 
FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. Create secure RPC for admin to resolve reports
CREATE OR REPLACE FUNCTION admin_resolve_qa_report(
    p_report_id UUID,
    p_action TEXT, -- 'dismiss', 'delete', 'flair'
    p_flair TEXT DEFAULT NULL
) RETURNS void AS $$
DECLARE
    v_admin_id UUID;
    v_target_id UUID;
    v_target_type TEXT;
    v_is_admin BOOLEAN;
BEGIN
    v_admin_id := auth.uid();
    
    -- Verify Admin
    SELECT (role = 'admin') INTO v_is_admin FROM public.profiles WHERE id = v_admin_id;
    IF v_is_admin IS NOT TRUE THEN
        RAISE EXCEPTION 'Unauthorized: Admins only';
    END IF;

    -- Get report details
    SELECT target_id, target_type INTO v_target_id, v_target_type 
    FROM public.qa_reports WHERE id = p_report_id;

    IF v_target_id IS NULL THEN
        RAISE EXCEPTION 'Report not found';
    END IF;

    -- Handle Action
    IF p_action = 'dismiss' THEN
        UPDATE public.qa_reports SET status = 'dismissed', resolved_by = v_admin_id, updated_at = now() WHERE id = p_report_id;
        
    ELSIF p_action = 'delete' THEN
        IF v_target_type = 'question' THEN
            DELETE FROM public.qa_questions WHERE id = v_target_id;
        ELSE
            DELETE FROM public.qa_answers WHERE id = v_target_id;
        END IF;
        -- Also mark the report as deleted
        UPDATE public.qa_reports SET status = 'deleted', resolved_by = v_admin_id, updated_at = now() WHERE id = p_report_id;
        
    ELSIF p_action = 'flair' THEN
        IF p_flair IS NULL OR p_flair = '' THEN
            RAISE EXCEPTION 'Flair text is required';
        END IF;

        IF v_target_type = 'question' THEN
            UPDATE public.qa_questions SET admin_flair = p_flair WHERE id = v_target_id;
        ELSE
            UPDATE public.qa_answers SET admin_flair = p_flair WHERE id = v_target_id;
        END IF;
        -- Mark as resolved
        UPDATE public.qa_reports SET status = 'resolved', resolved_by = v_admin_id, updated_at = now() WHERE id = p_report_id;
    ELSE
        RAISE EXCEPTION 'Invalid action';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
