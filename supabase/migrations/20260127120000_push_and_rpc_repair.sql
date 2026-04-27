-- REPAIR SCRIPT VERSION 4.0
-- This script cleans up broken legacy triggers and restores healthy RPCs.

-- 1. TRIGGER SANITIZER: Find and drop triggers/functions that reference the missing "secrets" table.
DO $$ 
DECLARE 
    t RECORD;
    f RECORD;
BEGIN
    -- A. Drop triggers that point to functions referencing "secrets"
    FOR t IN (
        SELECT trg.tgname, rel.relname as tablename
        FROM pg_trigger trg
        JOIN pg_class rel ON trg.tgrelid = rel.oid
        JOIN pg_proc proc ON trg.tgfoid = proc.oid
        WHERE (proc.prosrc ILIKE '%secrets%' OR proc.prosrc ILIKE '%secrsts%')
          AND proc.pronamespace = 'public'::regnamespace
    ) LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || t.tgname || ' ON ' || t.tablename;
    END LOOP;

    -- B. Drop the functions themselves
    FOR f IN (
        SELECT oid::regprocedure as fn_name 
        FROM pg_proc 
        WHERE (prosrc ILIKE '%secrets%' OR prosrc ILIKE '%secrsts%')
          AND pronamespace = 'public'::regnamespace
    ) LOOP
        EXECUTE 'DROP FUNCTION ' || f.fn_name;
    END LOOP;

    -- C. Standard RPC Cleanup (ensure clean slate for our core functions)
    FOR f IN (
        SELECT oid::regprocedure as fn_name 
        FROM pg_proc 
        WHERE proname IN (
            'send_community_message', 
            'get_unread_counts', 
            'has_unread_messages', 
            'update_read_status', 
            'mark_user_mentioned', 
            'toggle_message_reaction', 
            'increment_message_view'
        )
        AND pronamespace = 'public'::regnamespace
    ) LOOP
        EXECUTE 'DROP FUNCTION ' || f.fn_name;
    END LOOP;
END $$;

-- 2. Ensure fcm_token column exists in profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fcm_token TEXT;

-- 3. Restore send_community_message
CREATE OR REPLACE FUNCTION public.send_community_message(
    p_community_id UUID,
    p_content TEXT DEFAULT NULL,
    p_file_url TEXT DEFAULT NULL,
    p_file_type TEXT DEFAULT NULL,
    p_file_name TEXT DEFAULT NULL,
    p_reply_to_id UUID DEFAULT NULL,
    p_mentioned_user_ids UUID[] DEFAULT ARRAY[]::UUID[],
    p_link_preview JSONB DEFAULT NULL,
    p_batch_id UUID DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_message_id UUID;
BEGIN
    INSERT INTO public.community_messages (
        community_id, user_id, content, file_url, file_type, file_name, reply_to_id, link_preview, batch_id
    ) VALUES (
        p_community_id, auth.uid(), p_content, p_file_url, p_file_type, p_file_name, p_reply_to_id, p_link_preview, p_batch_id
    ) RETURNING id INTO v_message_id;

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Restore get_unread_counts
CREATE OR REPLACE FUNCTION public.get_unread_counts(p_user_id UUID)
RETURNS TABLE (comm_id UUID, unread_count BIGINT, mention_status BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        mem.community_id,
        COUNT(m.id) as unread_count,
        MAX(COALESCE(rs.has_unread_mention, false)) as mention_status
    FROM public.community_members mem
    JOIN public.community_messages m ON m.community_id = mem.community_id
    LEFT JOIN public.community_read_status rs ON (rs.community_id = mem.community_id AND rs.user_id = p_user_id)
    WHERE mem.user_id = p_user_id
        AND mem.status IN ('approved', 'member')
        AND m.user_id != p_user_id
        AND m.is_deleted = false
        AND m.created_at > COALESCE(rs.last_read_at, '1970-01-01Z'::TIMESTAMPTZ)
    GROUP BY mem.community_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Restore has_unread_messages (Global Bell)
CREATE OR REPLACE FUNCTION public.has_unread_messages(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM public.community_members mem
        JOIN public.community_messages m ON m.community_id = mem.community_id
        LEFT JOIN public.community_read_status rs ON (rs.community_id = mem.community_id AND rs.user_id = p_user_id)
        WHERE mem.user_id = p_user_id
            AND mem.status IN ('approved', 'member')
            AND m.user_id != p_user_id
            AND m.is_deleted = false
            AND m.created_at > COALESCE(rs.last_read_at, '1970-01-01Z'::TIMESTAMPTZ)
    ) INTO v_exists;
    RETURN v_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Restore update_read_status
CREATE OR REPLACE FUNCTION public.update_read_status(p_community_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.community_read_status (user_id, community_id, last_read_at, has_unread_mention)
    VALUES (auth.uid(), p_community_id, now(), false)
    ON CONFLICT (user_id, community_id)
    DO UPDATE SET last_read_at = now(), has_unread_mention = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Restore mark_user_mentioned
CREATE OR REPLACE FUNCTION public.mark_user_mentioned(p_user_id UUID, p_community_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.community_read_status (user_id, community_id, has_unread_mention)
    VALUES (p_user_id, p_community_id, true)
    ON CONFLICT (user_id, community_id)
    DO UPDATE SET has_unread_mention = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Restore toggle_message_reaction
CREATE OR REPLACE FUNCTION public.toggle_message_reaction(p_message_id UUID, p_emoji TEXT)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.message_reactions WHERE message_id = p_message_id AND user_id = auth.uid() AND emoji = p_emoji) THEN
        DELETE FROM public.message_reactions WHERE message_id = p_message_id AND user_id = auth.uid() AND emoji = p_emoji;
    ELSE
        INSERT INTO public.message_reactions (message_id, user_id, emoji) VALUES (p_message_id, auth.uid(), p_emoji);
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Restore increment_message_view
CREATE OR REPLACE FUNCTION public.increment_message_view(p_message_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.community_messages
    SET view_count = COALESCE(view_count, 0) + 1
    WHERE id = p_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Grant Execute Permissions
GRANT EXECUTE ON FUNCTION public.send_community_message TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_unread_counts TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.has_unread_messages TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.update_read_status TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.mark_user_mentioned TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.toggle_message_reaction TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.increment_message_view TO authenticated, anon;
