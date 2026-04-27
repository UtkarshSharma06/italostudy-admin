-- Add view_count column to community_messages
ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_message_view(p_message_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.community_messages
    SET view_count = view_count + 1
    WHERE id = p_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
