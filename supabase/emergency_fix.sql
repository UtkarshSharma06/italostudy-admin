-- EMERGENCY DATABASE REPAIR SCRIPT v8
-- RUN THIS IN THE SUPABASE SQL EDITOR

-- 1. Ensure Columns Exist (Safe to run multiple times)
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false;
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS pinned_message_id UUID;
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS is_restricted BOOLEAN DEFAULT false;

ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS link_preview JSONB DEFAULT NULL;
ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false;
ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 2. Ensure Tables Exist
CREATE TABLE IF NOT EXISTS public.community_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'banned', 'member')),
    role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(community_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.community_read_status (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE NOT NULL,
    last_read_at TIMESTAMPTZ DEFAULT now(),
    has_unread_mention BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id, community_id)
);

CREATE TABLE IF NOT EXISTS public.message_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES public.community_messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    emoji TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(message_id, user_id)
);

-- Fix for Bookmarks 404
CREATE TABLE IF NOT EXISTS public.bookmarked_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    question_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, question_id)
);

-- 3. DROP old functions to ensure fresh signatures
DROP FUNCTION IF EXISTS public.send_community_message(UUID, TEXT, TEXT, TEXT, TEXT, UUID, UUID[]);
DROP FUNCTION IF EXISTS public.send_community_message(UUID, TEXT, TEXT, TEXT, TEXT, UUID, UUID[], JSONB);
DROP FUNCTION IF EXISTS public.update_read_status(UUID);
DROP FUNCTION IF EXISTS public.get_unread_counts(UUID);
DROP FUNCTION IF EXISTS public.has_unread_messages(UUID);
DROP FUNCTION IF EXISTS public.toggle_message_reaction(UUID, TEXT);
DROP FUNCTION IF EXISTS public.increment_message_view(UUID);
DROP FUNCTION IF EXISTS public.delete_expired_messages(); -- Refresh signature
DROP FUNCTION IF EXISTS public.get_leaderboard(TEXT);

-- 4. CREATE FUNCTIONS (SECURITY DEFINER)

CREATE OR REPLACE FUNCTION public.send_community_message(
    p_community_id UUID,
    p_content TEXT DEFAULT NULL,
    p_file_url TEXT DEFAULT NULL,
    p_file_type TEXT DEFAULT NULL,
    p_file_name TEXT DEFAULT NULL,
    p_reply_to_id UUID DEFAULT NULL,
    p_mentioned_user_ids UUID[] DEFAULT ARRAY[]::UUID[],
    p_link_preview JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_message_id UUID;
    v_user_id UUID;
BEGIN
    INSERT INTO public.community_messages (
        community_id, user_id, content, file_url, file_type, file_name, reply_to_id, link_preview
    ) VALUES (
        p_community_id, auth.uid(), p_content, p_file_url, p_file_type, p_file_name, p_reply_to_id, p_link_preview
    ) RETURNING id INTO v_message_id;

    IF p_mentioned_user_ids IS NOT NULL AND array_length(p_mentioned_user_ids, 1) > 0 THEN
        FOREACH v_user_id IN ARRAY p_mentioned_user_ids
        LOOP
            IF v_user_id != auth.uid() THEN
                INSERT INTO public.community_read_status (user_id, community_id, has_unread_mention)
                VALUES (v_user_id, p_community_id, true)
                ON CONFLICT (user_id, community_id)
                DO UPDATE SET has_unread_mention = true;
            END IF;
        END LOOP;
    END IF;

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_read_status(p_community_id UUID)
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

CREATE OR REPLACE FUNCTION public.has_unread_messages(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_has_unread BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM public.community_members mem
        JOIN public.community_messages m ON m.community_id = mem.community_id
        LEFT JOIN public.community_read_status rs ON (rs.community_id = m.community_id AND rs.user_id = p_user_id)
        WHERE mem.user_id = p_user_id
            AND mem.status IN ('approved', 'member')
            AND m.user_id != p_user_id
            AND m.is_deleted = false
            AND m.created_at > COALESCE(rs.last_read_at, '1970-01-01Z'::TIMESTAMPTZ)
    ) INTO v_has_unread;

    IF NOT v_has_unread THEN
        SELECT EXISTS (
            SELECT 1 FROM public.community_read_status 
            WHERE user_id = p_user_id AND has_unread_mention = true
        ) INTO v_has_unread;
    END IF;
    
    RETURN v_has_unread;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.toggle_message_reaction(p_message_id UUID, p_emoji TEXT)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.message_reactions 
        WHERE message_id = p_message_id AND user_id = auth.uid() AND emoji = p_emoji
    ) THEN
        DELETE FROM public.message_reactions 
        WHERE message_id = p_message_id AND user_id = auth.uid();
    ELSE
        INSERT INTO public.message_reactions (message_id, user_id, emoji)
        VALUES (p_message_id, auth.uid(), p_emoji)
        ON CONFLICT (message_id, user_id) 
        DO UPDATE SET emoji = p_emoji, created_at = now();
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.increment_message_view(p_message_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.community_messages
    SET view_count = COALESCE(view_count, 0) + 1
    WHERE id = p_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.delete_expired_messages()
RETURNS void AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.community_messages
    WHERE created_at < (now() - INTERVAL '20 days');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % expired messages.', deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Leaderboard RPC (Fix for "Fake Champions")
CREATE OR REPLACE FUNCTION public.get_leaderboard(p_exam_id TEXT)
RETURNS TABLE (
    user_id UUID,
    display_name TEXT,
    avatar_url TEXT,
    total_score BIGINT,
    tests_taken BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.user_id,
        COALESCE(p.display_name, 'Anonymous') as display_name,
        p.avatar_url,
        SUM(COALESCE(t.correct_answers, 0))::BIGINT as total_score,
        COUNT(t.id)::BIGINT as tests_taken
    FROM tests t
    LEFT JOIN profiles p ON t.user_id = p.id
    WHERE t.status = 'completed' 
      AND t.exam_type = p_exam_id
    GROUP BY t.user_id, p.display_name, p.avatar_url
    ORDER BY total_score DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 5. GRANT PERMISSIONS
GRANT EXECUTE ON FUNCTION public.send_community_message TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.update_read_status TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_unread_counts TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_unread_messages TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.toggle_message_reaction TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.increment_message_view TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.delete_expired_messages TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT) TO service_role;

-- 6. RLS Policies
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_read_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarked_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view reactions" ON public.message_reactions;
CREATE POLICY "Anyone can view reactions" ON public.message_reactions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can manage own reactions" ON public.message_reactions;
CREATE POLICY "Users can manage own reactions" ON public.message_reactions FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own bookmarks" ON public.bookmarked_questions;
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarked_questions FOR ALL USING (auth.uid() = user_id);

-- 7. Realtime Publication
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'community_messages') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'message_reactions') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'bookmarked_questions') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarked_questions;
    END IF;
END $$;

-- 8. RESET STUCK CALLS (Fix for "Live Still Showing")
UPDATE public.community_calls SET is_active = false;

-- 9. SETUP MESSAGE AUTO-DELETION (20 Days) - wrapped in block to safely fail if extension missing
DO $$
BEGIN
    IF EXISTS (select * from pg_available_extensions where name = 'pg_cron') THEN
        CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
        PERFORM extensions.cron.schedule('delete-expired-messages-daily', '0 3 * * *', 'SELECT public.delete_expired_messages()');
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Cron setup skipped: %', SQLERRM;
END $$;

-- 10. Final Check
SELECT 'DATABASE REPAIRED SUCCESSFULLY - V8' as status;
