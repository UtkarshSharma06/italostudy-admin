-- Migration: Allow public read access to pricing_plans
-- Date: 2026-02-04

-- Drop the existing specific policy if it exists (or just add a new one)
-- To be safe and clean, we'll create a new policy specifically for pricing_plans
-- or simpler, update the existing "Anyone can view specific settings" if we could, 
-- but adding a new OR condition via a new policy is cleaner/safer than modifying existing ones in some cases.

CREATE POLICY "Anyone can view pricing plans" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key = 'pricing_plans');
