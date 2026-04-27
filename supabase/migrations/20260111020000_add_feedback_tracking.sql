-- Add feedback tracking columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS has_submitted_initial_feedback BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_feedback_status ON public.profiles(has_submitted_initial_feedback, created_at);

-- Update existing users to have created_at set (if null)
UPDATE public.profiles 
SET created_at = now() 
WHERE created_at IS NULL;
