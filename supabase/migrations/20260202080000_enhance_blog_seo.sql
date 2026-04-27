-- Migration to enhance blog_posts with SEO and Metadata columns
DO $$
BEGIN
    -- SEO Title
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'seo_title') THEN
        ALTER TABLE public.blog_posts ADD COLUMN seo_title TEXT;
    END IF;

    -- Meta Description
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'meta_description') THEN
        ALTER TABLE public.blog_posts ADD COLUMN meta_description TEXT;
    END IF;

    -- Canonical URL
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'canonical_url') THEN
        ALTER TABLE public.blog_posts ADD COLUMN canonical_url TEXT;
    END IF;

    -- Focus Keyword
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'focus_keyword') THEN
        ALTER TABLE public.blog_posts ADD COLUMN focus_keyword TEXT;
    END IF;

    -- Secondary Keywords
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'secondary_keywords') THEN
        ALTER TABLE public.blog_posts ADD COLUMN secondary_keywords JSONB DEFAULT '[]';
    END IF;

    -- SEO Metadata (OG, Indexing, etc.)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'seo_metadata') THEN
        ALTER TABLE public.blog_posts ADD COLUMN seo_metadata JSONB DEFAULT '{
            "indexing": {"index": true, "follow": true},
            "og": {"title": "", "description": "", "image": ""},
            "twitter": {"card": "summary_large_image"}
        }';
    END IF;

    -- FAQ Schema
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'faq_schema') THEN
        ALTER TABLE public.blog_posts ADD COLUMN faq_schema JSONB DEFAULT '[]';
    END IF;

    -- CTA Data
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'cta_data') THEN
        ALTER TABLE public.blog_posts ADD COLUMN cta_data JSONB DEFAULT '{}';
    END IF;

    -- Alt Text
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'alt_text') THEN
        ALTER TABLE public.blog_posts ADD COLUMN alt_text TEXT;
    END IF;

    -- Image Title
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'image_title') THEN
        ALTER TABLE public.blog_posts ADD COLUMN image_title TEXT;
    END IF;

    -- Last Updated At (Manual)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'last_updated_at') THEN
        ALTER TABLE public.blog_posts ADD COLUMN last_updated_at TIMESTAMPTZ;
    END IF;
END $$;
