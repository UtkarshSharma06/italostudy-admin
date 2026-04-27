-- Database migration to fix system_settings accessibility
-- Date: 2026-02-02

-- 1. Update the public read policy to allow more settings
DROP POLICY IF EXISTS "Anyone can view specific settings" ON public.system_settings;

CREATE POLICY "Anyone can view non-sensitive settings" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key IN ('maintenance_mode', 'enable_community', 'allow_registrations', 'site_config'));

-- 2. Ensure 'enable_community' exists
INSERT INTO public.system_settings (key, value)
VALUES ('enable_community', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;
