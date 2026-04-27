-- Add subscription_tier column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'initiate' CHECK (subscription_tier IN ('initiate', 'elite', 'global'));

-- Update existing users to have 'initiate' tier by default
UPDATE public.profiles 
SET subscription_tier = 'initiate' 
WHERE subscription_tier IS NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON public.profiles(subscription_tier);

-- Add comment
COMMENT ON COLUMN public.profiles.subscription_tier IS 'User subscription tier: initiate (free), elite (premium), or global (premium + concierge)';
