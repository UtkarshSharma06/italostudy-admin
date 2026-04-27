
-- NUCLEAR RLS RESET FOR SITE CONTENT
-- This migration ensures that ANYONE (even non-logged in users) can read the site reviews and settings.

-- 1. Reset site_settings
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read of site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow admins to manage site_settings" ON public.site_settings;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all" 
ON public.site_settings FOR SELECT 
USING (true);

CREATE POLICY "Enable all access for admins" 
ON public.site_settings FOR ALL 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'admin' OR email = 'contact@italostudy.com')
    )
);

-- 2. Reset site_reviews
ALTER TABLE public.site_reviews DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to published reviews" ON public.site_reviews;
DROP POLICY IF EXISTS "Allow admins full access to reviews" ON public.site_reviews;

ALTER TABLE public.site_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read for published reviews" 
ON public.site_reviews FOR SELECT 
USING (is_published = true);

CREATE POLICY "Enable all for admins" 
ON public.site_reviews FOR ALL 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'admin' OR email = 'contact@italostudy.com')
    )
);

-- 3. Explicit Grants
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT ON public.site_reviews TO anon;
GRANT SELECT ON public.site_settings TO authenticated;
GRANT SELECT ON public.site_reviews TO authenticated;
