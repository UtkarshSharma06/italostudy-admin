-- 1. Ensure columns exist (Idempotent)
ALTER TABLE public.admission_applications ADD COLUMN IF NOT EXISTS meeting_link TEXT;
ALTER TABLE public.admission_applications ADD COLUMN IF NOT EXISTS meeting_time TIMESTAMP WITH TIME ZONE;

-- 2. reset RLS for updates to be safe
DROP POLICY IF EXISTS "Consultants can update applications" ON public.admission_applications;

CREATE POLICY "Consultants can update applications"
ON public.admission_applications FOR UPDATE TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('consultant', 'admin')
)
WITH CHECK (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('consultant', 'admin')
);

-- 3. Ensure students can also see these columns (Select policy)
-- Existing select policy should cover it ("Users can view own applications"), assuming it selects *
