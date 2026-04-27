
-- Create site_reviews table
CREATE TABLE IF NOT EXISTS public.site_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    user_avatar TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    date_string TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to published reviews"
    ON public.site_reviews
    FOR SELECT
    USING (is_published = true);

CREATE POLICY "Allow admins full access to reviews"
    ON public.site_reviews
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND (role = 'admin' OR email = 'contact@italostudy.com')
        )
    );

-- Grant permissions
GRANT SELECT ON public.site_reviews TO anon;
GRANT SELECT ON public.site_reviews TO authenticated;
GRANT ALL ON public.site_reviews TO authenticated;
