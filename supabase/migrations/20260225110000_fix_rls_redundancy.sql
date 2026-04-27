
-- Simplify site_settings RLS
DROP POLICY IF EXISTS "Allow public read of site_settings" ON public.site_settings;
CREATE POLICY "Allow public read of site_settings"
    ON public.site_settings
    FOR SELECT
    USING (true);

-- Simplify site_reviews RLS
DROP POLICY IF EXISTS "Allow public read access to published reviews" ON public.site_reviews;
CREATE POLICY "Allow public read access to published reviews"
    ON public.site_reviews
    FOR SELECT
    USING (is_published = true);

-- Re-grant just in case
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT SELECT ON public.site_reviews TO anon, authenticated;
