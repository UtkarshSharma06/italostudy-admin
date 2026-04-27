-- Migration: 20260208130500_admin_detailed_users_rpc.sql
-- Goal: Provide detailed user auth info to administrators securely

CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
    id UUID,
    email TEXT,
    display_name TEXT,
    username TEXT,
    avatar_url TEXT,
    role TEXT,
    subscription_tier TEXT,
    community_enabled BOOLEAN,
    is_banned BOOLEAN,
    last_ip TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    email_verified BOOLEAN,
    auth_providers TEXT[]
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    -- Security Check: Only admins can call this
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE public.profiles.id = auth.uid() 
        AND public.profiles.role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Access denied. Administrator privileges required.';
    END IF;

    RETURN QUERY
    SELECT 
        p.id,
        p.email,
        p.display_name,
        p.username,
        p.avatar_url,
        p.role,
        p.subscription_tier,
        p.community_enabled,
        p.is_banned,
        p.last_ip,
        p.country,
        p.created_at,
        u.email_confirmed_at IS NOT NULL as email_verified,
        ARRAY(
            SELECT DISTINCT i.provider::text 
            FROM auth.identities i 
            WHERE i.user_id = u.id
        ) as auth_providers
    FROM 
        public.profiles p
    JOIN 
        auth.users u ON p.id = u.id
    ORDER BY 
        p.created_at DESC;
END;
$$;

-- Grant access to authenticated users (the function itself checks for admin role)
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;
