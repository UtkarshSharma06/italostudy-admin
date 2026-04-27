-- Migration: Real System Configuration Table
-- Date: 2026-02-02

-- Create system_settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can view/manage settings
CREATE POLICY "Admins can manage system_settings" 
ON public.system_settings 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- Anyone can select specific settings (needed for maintenance check)
CREATE POLICY "Anyone can view specific settings" 
ON public.system_settings 
FOR SELECT 
TO public 
USING (key = 'maintenance_mode');

-- Insert default settings
INSERT INTO public.system_settings (key, value) VALUES 
('maintenance_mode', 'false'::jsonb),
('allow_registrations', 'true'::jsonb),
('site_config', '{"site_name": "ItaloStudy", "support_email": "contact@italostudy.com"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
