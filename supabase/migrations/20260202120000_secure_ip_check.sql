-- Migration: Secure IP Ban Check and Security Monitor
-- Date: 2026-02-02

-- 1. Create a secure RPC to check if an IP is banned
-- This function uses SECURITY DEFINER to bypass RLS on banned_ips
CREATE OR REPLACE FUNCTION check_ip_banned(check_ip TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.banned_ips 
        WHERE ip = check_ip
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to everyone (anon and authenticated)
GRANT EXECUTE ON FUNCTION check_ip_banned(TEXT) TO anon, authenticated, service_role;

-- 2. Create a secure RPC to unban an IP (for admins)
CREATE OR REPLACE FUNCTION unban_ip(target_ip TEXT)
RETURNS VOID AS $$
BEGIN
    -- Check if executer is admin
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR role = 'sub_admin')
    ) THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    DELETE FROM public.banned_ips WHERE ip = target_ip;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. Update the check_ip_overlap function to be more robust
CREATE OR REPLACE FUNCTION check_ip_overlap(target_ip TEXT)
RETURNS TABLE (
    match_type TEXT,
    user_email TEXT,
    user_display_name TEXT
) AS $$
BEGIN
    -- Check if IP is explicitly banned
    IF EXISTS (SELECT 1 FROM public.banned_ips WHERE ip = target_ip) THEN
        RETURN QUERY SELECT 'BANNED_IP'::TEXT, NULL::TEXT, NULL::TEXT;
    END IF;

    -- Check for other accounts on same IP
    RETURN QUERY 
    SELECT 'ACCOUNT_OVERLAP'::TEXT, p.email, p.display_name
    FROM public.profiles p
    WHERE p.last_ip = target_ip
    LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Ensure site_notifications can be managed by admins via RLS
-- (Already handled in previous migrations but reinforcing update policy)
CREATE POLICY "Admins can update site_notifications"
ON public.site_notifications
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR role = 'sub_admin')
    )
);
