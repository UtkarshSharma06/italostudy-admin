-- Database migration to allow public read access to page_configs
-- Date: 2026-03-20

-- Update the public read policy to include 'page_configs'
DROP POLICY IF EXISTS "Anyone can view non-sensitive settings" ON public.system_settings;

CREATE POLICY "Anyone can view non-sensitive settings" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key IN ('maintenance_mode', 'enable_community', 'allow_registrations', 'site_config', 'page_configs'));
