-- Create consultant applications table
CREATE TABLE IF NOT EXISTS public.consultant_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    qualifications TEXT,
    experience TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.consultant_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
ON public.consultant_applications FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Users can create their own applications
CREATE POLICY "Users can create applications"
ON public.consultant_applications FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.consultant_applications FOR SELECT TO authenticated
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Admins can update applications (approve/reject)
CREATE POLICY "Admins can update applications"
ON public.consultant_applications FOR UPDATE TO authenticated
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_consultant_applications_user_id ON public.consultant_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_consultant_applications_status ON public.consultant_applications(status);
