-- Update site_notifications to support image content
ALTER TABLE public.site_notifications ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'html' CHECK (content_type IN ('html', 'image'));
ALTER TABLE public.site_notifications ADD COLUMN IF NOT EXISTS image_url TEXT;
