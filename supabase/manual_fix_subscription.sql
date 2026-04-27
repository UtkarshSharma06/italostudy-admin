-- Manual fix: Update your profile to global tier
-- Run this in Supabase SQL Editor to immediately fix your account

UPDATE profiles 
SET subscription_tier = 'global', 
    selected_plan = 'elite'
WHERE id = auth.uid();

-- Verify it worked
SELECT id, email, selected_plan, subscription_tier 
FROM profiles 
WHERE id = auth.uid();
