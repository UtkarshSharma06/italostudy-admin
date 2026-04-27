-- Create community_messages table
CREATE TABLE IF NOT EXISTS public.community_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    file_url TEXT,
    file_type TEXT, -- 'image', 'pdf', 'document', 'other'
    file_name TEXT,
    reply_to_id UUID REFERENCES public.community_messages(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_community_messages_user_id ON public.community_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_created_at ON public.community_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_community_messages_reply_to ON public.community_messages(reply_to_id);

-- Enable RLS
ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_messages
CREATE POLICY "Public read access for community messages"
    ON public.community_messages FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can insert messages"
    ON public.community_messages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages"
    ON public.community_messages FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete/update any message"
    ON public.community_messages FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create Storage Bucket for Community Uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('community-uploads', 'community-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Access"
    ON storage.objects FOR SELECT
    USING ( bucket_id = 'community-uploads' );

CREATE POLICY "Authenticated Uploads"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'community-uploads' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can delete their own files"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'community-uploads' AND
        auth.uid() = owner
    );
