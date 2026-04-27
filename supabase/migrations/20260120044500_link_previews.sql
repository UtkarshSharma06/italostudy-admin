-- Add link_preview column to community_messages
ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS link_preview JSONB;

-- Update the send_community_message RPC to include link_preview
CREATE OR REPLACE FUNCTION send_community_message(
    p_community_id UUID,
    p_content TEXT,
    p_file_url TEXT,
    p_file_type TEXT,
    p_file_name TEXT,
    p_reply_to_id UUID,
    p_mentioned_user_ids UUID[],
    p_link_preview JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_message_id UUID;
    v_user_id UUID;
BEGIN
    -- Insert Message
    INSERT INTO public.community_messages (
        community_id, user_id, content, file_url, file_type, file_name, reply_to_id, link_preview
    ) VALUES (
        p_community_id, auth.uid(), p_content, p_file_url, p_file_type, p_file_name, p_reply_to_id, p_link_preview
    ) RETURNING id INTO v_message_id;

    -- Insert Mentions
    IF p_mentioned_user_ids IS NOT NULL AND array_length(p_mentioned_user_ids, 1) > 0 THEN
        FOREACH v_user_id IN ARRAY p_mentioned_user_ids
        LOOP
            -- Don't notify self
            IF v_user_id != auth.uid() THEN
                INSERT INTO public.chat_mentions (user_id, sender_id, community_id, message_id)
                VALUES (v_user_id, auth.uid(), p_community_id, v_message_id);
            END IF;
        END LOOP;
    END IF;

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
