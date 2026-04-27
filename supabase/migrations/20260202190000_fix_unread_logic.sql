-- Migration: Fix Unread Counting Logic
-- Ensures unread dots only show for messages sent AFTER a user has joined a community

-- 1. Update get_unread_counts
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
        -- Use GREATEST to ensure we only count messages after join date AND after last read date
        AND m.created_at > GREATEST(COALESCE(rs.last_read_at, '1970-01-01Z'::TIMESTAMPTZ), mem.created_at)
    GROUP BY mem.community_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update has_unread_messages (Global Bell)
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
            -- Use GREATEST to ensure we only count messages after join date AND after last read date
            AND m.created_at > GREATEST(COALESCE(rs.last_read_at, '1970-01-01Z'::TIMESTAMPTZ), mem.created_at)
    ) INTO v_exists;
    RETURN v_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
