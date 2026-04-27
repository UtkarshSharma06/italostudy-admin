-- 1. Add username to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;

-- 2. Backfill usernames (using email prefix + random string to ensure uniqueness)
UPDATE public.profiles
SET username = lower(split_part(email, '@', 1) || '_' || substr(md5(random()::text), 1, 4))
WHERE username IS NULL;

-- 3. Add Unique Constraint
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);

-- 4. Create chat_mentions table
CREATE TABLE IF NOT EXISTS public.chat_mentions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) NOT NULL, -- The user receiving the mention
    sender_id UUID REFERENCES public.profiles(id) NOT NULL, -- The user sending the message
    community_id UUID REFERENCES public.communities(id) NOT NULL,
    message_id UUID REFERENCES public.community_messages(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. RLS for mentions
ALTER TABLE public.chat_mentions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own mentions"
    ON public.chat_mentions FOR SELECT
    USING (auth.uid() = user_id);
    
CREATE POLICY "Senders can insert mentions"
    ON public.chat_mentions FOR INSERT
    WITH CHECK (auth.uid() = sender_id);
    
CREATE POLICY "Users can update their own mentions (mark read)"
    ON public.chat_mentions FOR UPDATE
    USING (auth.uid() = user_id);

-- 6. RPC function to send message and handle mentions atomically
CREATE OR REPLACE FUNCTION send_community_message(
    p_community_id UUID,
    p_content TEXT,
    p_file_url TEXT,
    p_file_type TEXT,
    p_file_name TEXT,
    p_reply_to_id UUID,
    p_mentioned_user_ids UUID[]
) RETURNS UUID AS $$
DECLARE
    v_message_id UUID;
    v_user_id UUID;
BEGIN
    -- Insert Message
    INSERT INTO public.community_messages (
        community_id, user_id, content, file_url, file_type, file_name, reply_to_id
    ) VALUES (
        p_community_id, auth.uid(), p_content, p_file_url, p_file_type, p_file_name, p_reply_to_id
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
