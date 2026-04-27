-- Create notifications table
CREATE TABLE IF NOT EXISTS public.site_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    short_description TEXT,
    content_html TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    exam_type TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_site_notifications_created_at ON public.site_notifications(created_at DESC);

-- Create table to track read status per user
CREATE TABLE IF NOT EXISTS public.user_notifications_read (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_id UUID REFERENCES public.site_notifications(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (user_id, notification_id)
);

-- Enable RLS
ALTER TABLE public.site_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications_read ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_notifications
-- Everyone can read active notifications
CREATE POLICY "Anyone can view active notifications" 
ON public.site_notifications FOR SELECT 
USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins have full access to notifications" 
ON public.site_notifications FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- RLS Policies for user_notifications_read
-- Users can read their own read status
CREATE POLICY "Users can view their own read status" 
ON public.user_notifications_read FOR SELECT 
USING (auth.uid() = user_id);

-- Users can mark notifications as read
CREATE POLICY "Users can mark notifications as read" 
ON public.user_notifications_read FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can view all read statuses (optional, but helpful for analytics)
CREATE POLICY "Admins can view all read statuses" 
ON public.user_notifications_read FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);
