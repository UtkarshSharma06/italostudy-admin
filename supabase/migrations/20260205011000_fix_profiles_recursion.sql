-- Migration: Fix RLS recursion in profiles table
-- Date: 2026-02-05

-- 1. Create a security definer function to check roles
-- This breaks recursion because security definer functions bypass RLS
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'sub_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Drop the recursive policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- 3. Re-create the policy using the function
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  check_is_admin() 
  OR (auth.uid() = id)
);

-- 4. Update other admin policies to use the function for consistency and safety
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (check_is_admin());

DROP POLICY IF EXISTS "Admins can delete any profile" ON public.profiles;
CREATE POLICY "Admins can delete any profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (check_is_admin());
