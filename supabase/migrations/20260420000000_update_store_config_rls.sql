-- Update RLS for system_settings to allow public access to store_config
DROP POLICY IF EXISTS "Anyone can view non-sensitive settings" ON public.system_settings;

CREATE POLICY "Anyone can view non-sensitive settings" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key IN (
    'maintenance_mode', 
    'enable_community', 
    'allow_registrations', 
    'site_config', 
    'store_config',
    'is_review_collector_enabled',
    'page_configs',
    'pricing_plans',
    'pricing_coupon_message'
));
