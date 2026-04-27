-- Migration: create_seo_health_monitor
-- Description: Creates the systems to monitor SEO health including duplicate slugs, canonical errors, and redirects.

-- 1. Create url_redirects table for dynamic 301/302 redirects
CREATE TABLE IF NOT EXISTS public.url_redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_path TEXT NOT NULL UNIQUE,
    target_path TEXT NOT NULL,
    status_code INTEGER DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on url_redirects
ALTER TABLE public.url_redirects ENABLE ROW LEVEL SECURITY;

-- Policies for url_redirects
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'url_redirects' AND policyname = 'Allow public read access to active redirects') THEN
        CREATE POLICY "Allow public read access to active redirects" ON public.url_redirects FOR SELECT USING (is_active = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'url_redirects' AND policyname = 'Allow admin full access to redirects') THEN
        CREATE POLICY "Allow admin full access to redirects" ON public.url_redirects FOR ALL USING (
            auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'sub_admin'
        );
    END IF;
END $$;

-- 2. Create the SEO Health Report View
CREATE OR REPLACE VIEW public.seo_health_report AS
WITH all_slugs AS (
    SELECT 'blog_posts' as origin_table, id, slug, title as display_name, '/blog/' || slug as expected_path FROM blog_posts
    UNION ALL
    SELECT 'exam_resources' as origin_table, id, slug, title as display_name, '/resources/' || slug as expected_path FROM exam_resources
    UNION ALL
    SELECT 'qa_questions' as origin_table, id, slug, title as display_name, '/answers/' || slug as expected_path FROM qa_questions
    UNION ALL
    SELECT 'exams' as origin_table, id, slug, name as display_name, '/exams/' || slug as expected_path FROM exams
    UNION ALL
    SELECT 'blog_categories' as origin_table, id, slug, name as display_name, '/blog/category/' || slug as expected_path FROM blog_categories
    UNION ALL
    SELECT 'blog_tags' as origin_table, id, slug, name as display_name, '/blog/tag/' || slug as expected_path FROM blog_tags
),
slug_counts AS (
    SELECT slug, count(*) as occurrence_count
    FROM all_slugs
    GROUP BY slug
)
SELECT 
    'duplicate_slug' as issue_type,
    origin_table,
    id as row_id,
    display_name,
    slug as current_value,
    expected_path,
    'Duplicate slug found across content: ' || slug as issue_description,
    'high' as severity
FROM all_slugs
WHERE slug IN (SELECT slug FROM slug_counts WHERE occurrence_count > 1)

UNION ALL

-- Canonical Errors (e.g. check if blog_posts has a canonical_url that doesn't match the expected path)
SELECT 
    'canonical_mismatch' as issue_type,
    'blog_posts' as origin_table,
    id as row_id,
    title as display_name,
    canonical_url as current_value,
    'https://italostudy.com/blog/' || slug as expected_path,
    'Canonical URL mismatch or missing' as issue_description,
    'medium' as severity
FROM blog_posts
WHERE canonical_url IS NULL OR canonical_url != 'https://italostudy.com/blog/' || slug

UNION ALL

-- Redirect Loops
SELECT 
    'redirect_loop' as issue_type,
    'url_redirects' as origin_table,
    id as row_id,
    source_path as display_name,
    source_path as current_value,
    target_path as expected_path,
    'Redirect source matches target (Infinite loop)' as issue_description,
    'critical' as severity
FROM url_redirects
WHERE source_path = target_path;

-- 3. RPC Functions for Instant Fixes

-- Function to update a slug and automatically create a 301 redirect
CREATE OR REPLACE FUNCTION public.update_content_slug(
    target_table TEXT,
    target_id UUID,
    new_slug TEXT
) RETURNS VOID AS $$
DECLARE
    old_slug TEXT;
    base_path TEXT;
BEGIN
    -- 1. Determine base path and get old slug
    IF target_table = 'blog_posts' THEN
        SELECT slug INTO old_slug FROM blog_posts WHERE id = target_id;
        base_path := '/blog/';
        UPDATE blog_posts SET slug = new_slug, updated_at = now() WHERE id = target_id;
    ELSIF target_table = 'exam_resources' THEN
        SELECT slug INTO old_slug FROM exam_resources WHERE id = target_id;
        base_path := '/resources/';
        UPDATE exam_resources SET slug = new_slug WHERE id = target_id;
    ELSIF target_table = 'qa_questions' THEN
        SELECT slug INTO old_slug FROM qa_questions WHERE id = target_id;
        base_path := '/answers/';
        UPDATE qa_questions SET slug = new_slug, updated_at = now() WHERE id = target_id;
    ELSIF target_table = 'exams' THEN
        SELECT slug INTO old_slug FROM exams WHERE id = target_id;
        base_path := '/exams/';
        UPDATE exams SET slug = new_slug, updated_at = now() WHERE id = target_id;
    ELSE
        RAISE EXCEPTION 'Unsupported table: %', target_table;
    END IF;

    -- 2. Create the 301 redirect
    IF old_slug IS NOT NULL AND old_slug != new_slug THEN
        INSERT INTO public.url_redirects (source_path, target_path, status_code)
        VALUES (base_path || old_slug, base_path || new_slug, 301)
        ON CONFLICT (source_path) 
        DO UPDATE SET target_path = EXCLUDED.target_path, updated_at = now();
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to fix canonical URL
CREATE OR REPLACE FUNCTION public.fix_canonical_url(
    target_id UUID,
    new_canonical TEXT
) RETURNS VOID AS $$
BEGIN
    UPDATE blog_posts 
    SET canonical_url = new_canonical, 
        updated_at = now() 
    WHERE id = target_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions (if needed, though VIEW and RPC handles much of it)
GRANT SELECT ON public.seo_health_report TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_content_slug TO authenticated;
GRANT EXECUTE ON FUNCTION public.fix_canonical_url TO authenticated;
