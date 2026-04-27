
-- Add views column to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Function to increment blog view count securely
CREATE OR REPLACE FUNCTION increment_blog_view(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$;

-- Grant execute permissions to anonymously logged in users (API)
GRANT EXECUTE ON FUNCTION increment_blog_view(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_blog_view(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_blog_view(UUID) TO service_role;
