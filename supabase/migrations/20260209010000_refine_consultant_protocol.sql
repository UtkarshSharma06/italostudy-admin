-- 1. Add is_consultant column to profiles table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'is_consultant') THEN
        ALTER TABLE public.profiles ADD COLUMN is_consultant BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 2. Update RLS on consultant_access_codes to allow admins to activate codes
-- First drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can mark their own code as used" ON public.consultant_access_codes;

-- Create more flexible policy
-- Regular users can only update codes assigned to their email (protocol_id)
-- Admins and sub_admins can update ANY valid code (to activate for themselves or others)
CREATE POLICY "Allow code activation"
ON public.consultant_access_codes FOR UPDATE TO authenticated
USING (
    (protocol_id = (auth.jwt() ->> 'email') AND is_used = false)
    OR 
    (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'sub_admin')
    ) AND is_used = false)
)
WITH CHECK (
    -- Ensure the row is actually marked as used by the person activating it
    is_used = true 
    AND used_by = auth.uid()
);
