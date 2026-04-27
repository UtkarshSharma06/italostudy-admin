-- Add push_type and send_push columns to site_notifications table
ALTER TABLE public.site_notifications ADD COLUMN IF NOT EXISTS push_type TEXT DEFAULT 'announcement';
ALTER TABLE public.site_notifications ADD COLUMN IF NOT EXISTS send_push BOOLEAN DEFAULT true;

-- Add comment explaining the values
COMMENT ON COLUMN public.site_notifications.push_type IS 'Category of the push notification: announcement, deal, or warning';
COMMENT ON COLUMN public.site_notifications.send_push IS 'Whether this notification was sent as a push notification to devices';
