
-- Create site_settings table for configurable section metadata
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read of site_settings"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow admin write
CREATE POLICY "Allow admins to manage site_settings"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND (role = 'admin' OR email = 'contact@italostudy.com')
        )
    );

GRANT SELECT ON public.site_settings TO anon;
GRANT ALL ON public.site_settings TO authenticated;

-- Insert default trustpilot section settings
INSERT INTO public.site_settings (key, value)
VALUES
    ('trustpilot_section_title', 'Our customers'' Trustpilot reviews'),
    ('trustpilot_review_count', '248'),
    ('trustpilot_avg_rating', '4.9')
ON CONFLICT (key) DO NOTHING;
