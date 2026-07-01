-- Fix for Onboarding Premium Plan Bug
-- Revert users who incorrectly received premium plans without setting an expiry date.
-- These are users who exploited the Onboarding Step 5 flaw.

UPDATE public.profiles
SET 
    selected_plan = 'explorer',
    subscription_tier = 'initiate'
WHERE 
    subscription_tier IN ('global', 'elite', 'pro') 
    AND subscription_expiry_date IS NULL;
