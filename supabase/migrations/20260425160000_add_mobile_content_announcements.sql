-- Add mobile_content column to site_announcements table
ALTER TABLE site_announcements 
ADD COLUMN IF NOT EXISTS mobile_content TEXT;

COMMENT ON COLUMN site_announcements.mobile_content IS 'Optional mobile-optimized HTML. If provided, shown instead of content on mobile screens.';
