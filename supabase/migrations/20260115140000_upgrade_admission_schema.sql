-- Upgrade admission_applications table for the detailed student application system

-- 1. Add new columns
ALTER TABLE public.admission_applications 
ADD COLUMN IF NOT EXISTS application_data JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS application_status TEXT DEFAULT 'draft', -- draft, submitted, under_review, etc.
ADD COLUMN IF NOT EXISTS target_country TEXT,
ADD COLUMN IF NOT EXISTS target_degree TEXT;

-- 2. Add consultant_id if it doesn't exist (it was in the original schema but just to be safe/consistent)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admission_applications' AND column_name = 'consultant_id') THEN
        ALTER TABLE public.admission_applications ADD COLUMN consultant_id UUID REFERENCES auth.users(id);
    END IF;
END $$;

-- 3. Update Status Check Constraint to include new statuses
ALTER TABLE public.admission_applications DROP CONSTRAINT IF EXISTS admission_applications_status_check;
ALTER TABLE public.admission_applications ADD CONSTRAINT admission_applications_status_check 
CHECK (status IN ('not_started', 'draft', 'submitted', 'pending', 'under_review', 'documents_required', 'accepted', 'rejected', 'completed'));

-- 4. Create index for faster JSONB queries if needed
CREATE INDEX IF NOT EXISTS idx_admission_applications_data ON public.admission_applications USING gin (application_data);
