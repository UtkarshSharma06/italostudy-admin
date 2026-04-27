-- Create table to track last read message per user per community
CREATE TABLE IF NOT EXISTS public.community_read_status (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE NOT NULL,
    last_read_at TIMESTAMPTZ DEFAULT now(),
    has_unread_mention BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id, community_id)
);

-- Enable RLS
ALTER TABLE public.community_read_status ENABLE ROW LEVEL SECURITY;

-- Users can read their own read status
CREATE POLICY "Users can view own read status" ON public.community_read_status
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own read status
CREATE POLICY "Users can insert own read status" ON public.community_read_status
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own read status
CREATE POLICY "Users can update own read status" ON public.community_read_status
    FOR UPDATE USING (auth.uid() = user_id);

-- Function to update read status when user opens a chat
CREATE OR REPLACE FUNCTION update_read_status(p_community_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.community_read_status (user_id, community_id, last_read_at, has_unread_mention)
    VALUES (auth.uid(), p_community_id, now(), false)
    ON CONFLICT (user_id, community_id)
    DO UPDATE SET 
        last_read_at = now(),
        has_unread_mention = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark mention for a user
CREATE OR REPLACE FUNCTION mark_user_mentioned(p_community_id UUID, p_mentioned_user_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.community_read_status (user_id, community_id, has_unread_mention)
    VALUES (p_mentioned_user_id, p_community_id, true)
    ON CONFLICT (user_id, community_id)
    DO UPDATE SET has_unread_mention = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
