-- Migration: Allow Admins to view all profiles for management
-- Date: 2026-02-05

-- Policy: Admins and Sub-Admins can view ALL profiles
-- This is necessary for joined queries in the Admin Dashboard (e.g. Transactions -> Profiles)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'sub_admin')
    )
    OR (auth.uid() = id) -- Users can still view their own
);
