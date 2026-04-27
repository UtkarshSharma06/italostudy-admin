-- Create email_metadata table
CREATE TABLE IF NOT EXISTS email_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resend_id TEXT,
    from_email TEXT NOT NULL,
    to_email TEXT NOT NULL,
    subject TEXT,
    snippet TEXT, -- Short preview of the content
    r2_key TEXT NOT NULL, -- Key used to retrieve body (now stored in Supabase Storage)
    folder TEXT DEFAULT 'inbox', -- inbox, sent, drafts, trash
    is_read BOOLEAN DEFAULT false,
    has_attachments BOOLEAN DEFAULT false,
    attachments jsonb DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_email_metadata_folder ON email_metadata(folder);
CREATE INDEX IF NOT EXISTS idx_email_metadata_created_at ON email_metadata(created_at DESC);

-- Enable RLS
ALTER TABLE email_metadata ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can access emails
DROP POLICY IF EXISTS "Admins can manage emails" ON email_metadata;
CREATE POLICY "Admins can manage emails"
ON email_metadata
FOR ALL
TO authenticated
USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_email_metadata_updated_at ON email_metadata;
CREATE TRIGGER update_email_metadata_updated_at
    BEFORE UPDATE ON email_metadata
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create storage bucket for email content
INSERT INTO storage.buckets (id, name, public) 
VALUES ('email-content', 'email-content', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Allow authenticated users (admins) to manage files
DROP POLICY IF EXISTS "Admin Email Management" ON storage.objects;
CREATE POLICY "Admin Email Management"
ON storage.objects FOR ALL 
TO authenticated
USING (bucket_id = 'email-content');

-- Create mail_settings table for dynamic branding
CREATE TABLE IF NOT EXISTS mail_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name text DEFAULT 'ItaloStudy Support',
    logo_url text,
    signature text,
    updated_at timestamptz DEFAULT now()
);

-- Initial settings row
INSERT INTO mail_settings (id, display_name)
VALUES ('00000000-0000-0000-0000-000000000000', 'ItaloStudy Support')
ON CONFLICT (id) DO NOTHING;

-- RLS for mail_settings
ALTER TABLE mail_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage settings" ON mail_settings;
CREATE POLICY "Admins can manage settings"
ON mail_settings FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
