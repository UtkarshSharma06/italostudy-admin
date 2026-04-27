-- URGENT FIX: Manually update your profile to global (run in Supabase SQL Editor)

-- 1. Check current state
SELECT id, email, selected_plan, subscription_tier 
FROM profiles 
WHERE email = 'YOUR_EMAIL_HERE';  -- Replace with your email

-- 2. Force update to global
UPDATE profiles 
SET selected_plan = 'global',
    subscription_tier = 'global'
WHERE email = 'YOUR_EMAIL_HERE';  -- Replace with your email

-- 3. Verify it worked
SELECT id, email, selected_plan, subscription_tier 
FROM profiles 
WHERE email = 'YOUR_EMAIL_HERE';

-- 4. Check all users with plans
SELECT 
    selected_plan, 
    subscription_tier,
    COUNT(*) as user_count
FROM profiles
GROUP BY selected_plan, subscription_tier
ORDER BY user_count DESC;
