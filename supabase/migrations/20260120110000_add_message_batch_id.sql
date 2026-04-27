-- Add batch_id to community_messages for grouping multiple uploads (WhatsApp style)
ALTER TABLE public.community_messages ADD COLUMN batch_id UUID;

-- Update the send_community_message RPC to handle batch_id
CREATE OR REPLACE FUNCTION public.send_community_message(
    p_community_id UUID,
    p_content TEXT,
    p_file_url TEXT DEFAULT NULL,
    p_file_type TEXT DEFAULT NULL,
    p_file_name TEXT DEFAULT NULL,
    p_reply_to_id UUID DEFAULT NULL,
    p_mentioned_user_ids UUID[] DEFAULT '{}',
    p_link_preview JSONB DEFAULT NULL,
    p_batch_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_message_id UUID;
    v_user_id UUID;
    v_target_user_id UUID;
BEGIN
    v_user_id := auth.uid();
    
    INSERT INTO public.community_messages (
        community_id,
        user_id,
        content,
        file_url,
        file_type,
        file_name,
        reply_to_id,
        link_preview,
        batch_id
    )
    VALUES (
        p_community_id,
        v_user_id,
        p_content,
        p_file_url,
        p_file_type,
        p_file_name,
        p_reply_to_id,
        p_link_preview,
        p_batch_id
    )
    RETURNING id INTO v_message_id;

    -- Handle mentions
    IF array_length(p_mentioned_user_ids, 1) > 0 THEN
        FOREACH v_target_user_id IN ARRAY p_mentioned_user_ids
        LOOP
            INSERT INTO public.chat_mentions (message_id, user_id, community_id)
            VALUES (v_message_id, v_target_user_id, p_community_id);
        END LOOP;
    END IF;

    -- Update community member count or other stats if needed
    -- (Omitted here if already handled by triggers)

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
