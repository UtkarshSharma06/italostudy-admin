-- Function to handle mentions automatically on new messages
CREATE OR REPLACE FUNCTION handle_community_message_mentions()
RETURNS TRIGGER AS $$
DECLARE
    mentioned_username TEXT;
    mentioned_user_id UUID;
BEGIN
    -- Only process if content is not null
    IF NEW.content IS NOT NULL THEN
        -- Find all matches for @username and process each one
        FOR mentioned_username IN 
            SELECT DISTINCT (regexp_matches(NEW.content, '@([a-zA-Z0-9_]+)', 'g'))[1]
        LOOP
            -- Get the user_id for the username
            SELECT id INTO mentioned_user_id
            FROM public.profiles
            WHERE username = mentioned_username OR display_name = mentioned_username
            LIMIT 1;

            -- If user found, mark them as mentioned
            IF mentioned_user_id IS NOT NULL AND mentioned_user_id != NEW.user_id THEN
                INSERT INTO public.community_read_status (user_id, community_id, has_unread_mention)
                VALUES (mentioned_user_id, NEW.community_id, true)
                ON CONFLICT (user_id, community_id)
                DO UPDATE SET has_unread_mention = true;
            END IF;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run after a new message is inserted
DROP TRIGGER IF EXISTS on_community_message_mention ON public.community_messages;
CREATE TRIGGER on_community_message_mention
    AFTER INSERT ON public.community_messages
    FOR EACH ROW
    EXECUTE FUNCTION handle_community_message_mentions();
