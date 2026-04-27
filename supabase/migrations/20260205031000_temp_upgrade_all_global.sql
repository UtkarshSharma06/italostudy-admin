-- TEMPORARY: Assign all users to Global plan for testing
UPDATE profiles
SET 
    selected_plan = 'global',
    subscription_tier = 'global',
    subscription_expiry_date = now() + INTERVAL '1 year'
WHERE role != 'admin'; -- Keep admins as admins, but upgrade their plan features if they have a non-admin role check somewhere

-- Also ensure those who were on 'explorer' now see the premium features
-- The refresh will happen on next page load or via real-time listeners implemented in Layout.tsx
