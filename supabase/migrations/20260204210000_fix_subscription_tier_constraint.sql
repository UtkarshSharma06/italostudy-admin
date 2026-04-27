-- Fix: Update subscription_tier constraint to allow all valid values
-- Date: 2026-02-04

-- Drop old constraint
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_subscription_tier_check;

-- Add new constraint with all valid values
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_subscription_tier_check 
CHECK (subscription_tier IN ('free', 'initiate', 'pro', 'elite', 'global'));

-- Update comment
COMMENT ON COLUMN public.profiles.subscription_tier IS 'User subscription tier: free/initiate (free), pro (mid-tier), elite/global (premium)';
