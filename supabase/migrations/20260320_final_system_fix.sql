-- Final fix for system_settings and transactions constraint
-- Created: 2026-03-20

-- 1. Ensure system_settings keys exist to prevent 406 errors from .single()
INSERT INTO public.system_settings (key, value)
VALUES 
('is_review_collector_enabled', 'true'::jsonb),
('enable_community', 'true'::jsonb),
('allow_registrations', 'true'::jsonb),
('maintenance_mode', 'false'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 2. Update RLS policy to include all required public keys
DROP POLICY IF EXISTS "Anyone can view non-sensitive settings" ON public.system_settings;
DROP POLICY IF EXISTS "Anyone can view specific settings" ON public.system_settings;

CREATE POLICY "Anyone can view non-sensitive settings" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key IN ('maintenance_mode', 'enable_community', 'allow_registrations', 'site_config', 'is_review_collector_enabled', 'page_configs'));

-- 3. Fix transactions payment_method constraint to allow 'beta'
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_payment_method_check;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_payment_method_check 
CHECK (payment_method IN ('stripe', 'razorpay', 'paypal', 'lemonsqueezy', 'cashfree', 'beta'));
