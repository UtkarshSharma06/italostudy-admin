-- Add target_score and study_hours to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS target_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS study_hours TEXT;

-- Update RLS policies if necessary (usually they cover all columns)
COMMENT ON COLUMN public.profiles.target_score IS 'User target score for the selected exam';
COMMENT ON COLUMN public.profiles.study_hours IS 'Weekly hours user can commit to studying';
