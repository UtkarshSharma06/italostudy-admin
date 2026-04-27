-- Migration: Fix Ban RLS and Add Country Tracking
-- Date: 2026-02-02

-- 1. Add country column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;

-- 2. Update RLS policies for profiles to allow sub_admins to manage users
-- Drop existing narrow policies
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete any profile" ON public.profiles;

-- Create more inclusive policies for admins and sub_admins
CREATE POLICY "Admins and sub_admins can update profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid()
        AND (p.role = 'admin' OR p.role = 'sub_admin')
    )
);

CREATE POLICY "Admins and sub_admins can delete profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid()
        AND (p.role = 'admin' OR p.role = 'sub_admin')
    )
);

-- 3. Ensure site_notifications can be read by admins
-- (Assuming they already can, but just to be sure)
ALTER TABLE public.site_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all notifications" ON public.site_notifications;
CREATE POLICY "Admins can view all notifications"
ON public.site_notifications
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid()
        AND (p.role = 'admin' OR p.role = 'sub_admin')
    )
);
