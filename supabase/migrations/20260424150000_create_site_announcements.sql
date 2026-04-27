-- Create site_announcements table
CREATE TABLE IF NOT EXISTS site_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    content TEXT NOT NULL,
    template_id TEXT NOT NULL DEFAULT 'standard',
    is_active BOOLEAN DEFAULT TRUE,
    page_target TEXT DEFAULT 'global', -- 'global', 'store', 'dashboard'
    link_url TEXT,
    button_text TEXT,
    bg_color TEXT,
    text_color TEXT,
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE site_announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Allow public read access for site_announcements" ON site_announcements;
CREATE POLICY "Allow public read access for site_announcements"
    ON site_announcements FOR SELECT
    USING (TRUE);

-- Allow admins to manage
CREATE POLICY "Allow admins to manage site_announcements"
    ON site_announcements FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'sub_admin')
        )
    );

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE site_announcements;
