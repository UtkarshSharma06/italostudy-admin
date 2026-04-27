-- Add link and button columns to site_notifications
ALTER TABLE public.site_notifications 
ADD COLUMN IF NOT EXISTS link_url TEXT,
ADD COLUMN IF NOT EXISTS button_label TEXT,
ADD COLUMN IF NOT EXISTS link_type TEXT DEFAULT 'internal';

-- Re-verify RLS policies (they should already cover new columns as they use SELECT *)
-- No changes needed to RLS.
