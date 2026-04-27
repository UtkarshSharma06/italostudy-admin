-- Add management columns to profiles if they don't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS community_enabled BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Enable RLS (Should be already enabled, but safe to repeat)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view ALL profiles (overrides public view if needed, or ensures access)
-- Note: 'Public profiles are viewable by everyone' usually covers SELECT.

-- Policy: Admins can UPDATE any profile (Ban/Restrict)
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile"
ON public.profiles
FOR UPDATE
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Policy: Admins can DELETE any profile (Optional, but useful)
DROP POLICY IF EXISTS "Admins can delete any profile" ON public.profiles;
CREATE POLICY "Admins can delete any profile"
ON public.profiles
FOR DELETE
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
