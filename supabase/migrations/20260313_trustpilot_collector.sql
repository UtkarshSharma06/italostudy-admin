-- Trustpilot Review Screenshot Collector Setup
-- Created: 2026-03-13

-- 1. Add column to profiles to track submission status
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_submitted_review BOOLEAN DEFAULT FALSE;

-- 2. Create review_submissions table
CREATE TABLE IF NOT EXISTS public.review_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    extracted_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Add global toggle to system_settings if it doesn't exist
INSERT INTO public.system_settings (key, value)
VALUES ('is_review_collector_enabled', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 4. Update the public read policy for system_settings to include the collector toggle
DROP POLICY IF EXISTS "Anyone can view non-sensitive settings" ON public.system_settings;
CREATE POLICY "Anyone can view non-sensitive settings" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key IN ('maintenance_mode', 'enable_community', 'allow_registrations', 'site_config', 'is_review_collector_enabled'));

-- 5. Enable RLS for review_submissions
ALTER TABLE public.review_submissions ENABLE ROW LEVEL SECURITY;

-- 5. Policies
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.review_submissions;
CREATE POLICY "Users can insert their own submissions" 
ON public.review_submissions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all submissions" ON public.review_submissions;
CREATE POLICY "Admins can view all submissions" 
ON public.review_submissions FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff', 'sub_admin')
  )
);

DROP POLICY IF EXISTS "Admins can delete any submission" ON public.review_submissions;
CREATE POLICY "Admins can delete any submission" 
ON public.review_submissions FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff', 'sub_admin')
  )
);

-- 6. RPC for Admin Cleanup (Optional but helpful)
-- This allows updating user profile and deleting submission in one transaction
-- But we handle this in the frontend currently.
