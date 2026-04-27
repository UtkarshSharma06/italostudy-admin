-- Add selected_plan column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS selected_plan TEXT;

-- Add a comment to the column
COMMENT ON COLUMN public.profiles.selected_plan IS 'The subscription plan chosen by the user during onboarding (e.g., Initiate, Elite, Global)';
