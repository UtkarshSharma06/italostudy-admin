-- RPC to fetch unread message counts and mention status for all joined communities
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

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.get_unread_counts TO anon, authenticated, service_role;
