-- Add selected_exam column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS selected_exam TEXT;

-- Add a comment to the column
COMMENT ON COLUMN public.profiles.selected_exam IS 'The exam the user chose to prepare for during onboarding (e.g., IMAT, SAT, IELTS, CEnT-S)';

-- Update RLS policies to ensure it's updatable (already covered by existing "Users can update own profile" policy)
