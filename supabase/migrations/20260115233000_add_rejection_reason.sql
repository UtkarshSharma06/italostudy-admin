-- Add rejection reason to admission applications
ALTER TABLE public.admission_applications 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
