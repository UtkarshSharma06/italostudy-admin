-- Migration: Advanced Analytics and IP Ban System
-- Date: 2026-02-02

-- 1. Add last_ip to profiles to track user connections
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_ip TEXT;

-- 2. Create banned_ips table
CREATE TABLE IF NOT EXISTS public.banned_ips (
    ip TEXT PRIMARY KEY,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for banned_ips
ALTER TABLE public.banned_ips ENABLE ROW LEVEL SECURITY;

-- Only admins can view/manage banned IPs
CREATE POLICY "Admins can manage banned_ips" 
ON public.banned_ips 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- 3. Create site_visits table for traffic analysis
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT,
    path TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for site_visits
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Only admins can view site visits
CREATE POLICY "Admins can view site_visits" 
ON public.site_visits 
FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- Anyone can insert visit data (to track anonymous and logged in users)
CREATE POLICY "Anyone can record site_visits" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (true);

-- 4. RPC for Admin Dashboard Statistics
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    total_users INT;
    new_users_today INT;
    total_visitors INT;
    unique_visitors_today INT;
    active_subscriptions INT;
    active_bans_count INT;
    retention_rate NUMERIC;
    top_exams JSON;
    recent_activity JSON;
BEGIN
    -- Total User Count
    SELECT COUNT(*) INTO total_users FROM public.profiles;
    
    -- New Users Today
    SELECT COUNT(*) INTO new_users_today FROM public.profiles 
    WHERE created_at >= CURRENT_DATE;
    
    -- Total Global Visitors (All time records)
    SELECT COUNT(*) INTO total_visitors FROM public.site_visits;
    
    -- Unique Visitors Today (By unique IP)
    SELECT COUNT(DISTINCT ip_address) INTO unique_visitors_today FROM public.site_visits
    WHERE created_at >= CURRENT_DATE;
    
    -- Active Subscriptions (Pro or Elite)
    SELECT COUNT(*) INTO active_subscriptions FROM public.profiles
    WHERE selected_plan IN ('pro', 'elite');

    -- Active Bans
    SELECT COUNT(*) INTO active_bans_count FROM public.banned_ips;
    
    -- Basic Retention (Users logged in last 7 days / Total Users) - Approximated
    SELECT 
        CASE 
            WHEN total_users = 0 THEN 0 
            ELSE ROUND((COUNT(DISTINCT profiles.id)::NUMERIC / total_users::NUMERIC) * 100, 1)
        END INTO retention_rate
    FROM public.profiles
    JOIN public.site_visits ON site_visits.ip_address = profiles.last_ip
    WHERE site_visits.created_at >= NOW() - INTERVAL '7 days';
    
    -- Top Exams (Based on practice responses)
    SELECT json_agg(t) INTO top_exams FROM (
        SELECT exam_type, COUNT(*) as count
        FROM public.user_practice_responses
        GROUP BY exam_type
        ORDER BY count DESC
        LIMIT 5
    ) t;

    -- Recent Activity (Last 5 signups or major visits)
    SELECT json_agg(act) INTO recent_activity FROM (
        (SELECT 
            'registration' as type,
            display_name as title,
            'Joined from ' || COALESCE(last_ip, 'Unknown IP') as description,
            created_at as time
        FROM public.profiles
        ORDER BY created_at DESC
        LIMIT 3)
        UNION ALL
        (SELECT 
            'visit' as type,
            'Visitor' as title,
            'Accessed ' || path as description,
            created_at as time
        FROM public.site_visits
        ORDER BY created_at DESC
        LIMIT 3)
        ORDER BY time DESC
        LIMIT 5
    ) act;

    RETURN json_build_object(
        'total_users', total_users,
        'new_users_today', new_users_today,
        'total_visitors', total_visitors,
        'unique_visitors_today', unique_visitors_today,
        'active_subscriptions', active_subscriptions,
        'active_bans_count', active_bans_count,
        'retention_rate', retention_rate,
        'top_exams', COALESCE(top_exams, '[]'::json),
        'recent_activity', COALESCE(recent_activity, '[]'::json)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Function to check for IP overlap (Banned IPs or multiple accounts)
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
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Enhance site_notifications for role-based alerting
ALTER TABLE public.site_notifications ADD COLUMN IF NOT EXISTS target_role TEXT DEFAULT 'all';

-- 7. Trigger to alert admins on suspicious IP usage during signup
CREATE OR REPLACE FUNCTION notify_ip_overlap()
RETURNS TRIGGER AS $$
DECLARE
    overlap_count INT;
BEGIN
    IF NEW.last_ip IS NOT NULL THEN
        SELECT COUNT(*) INTO overlap_count 
        FROM public.profiles 
        WHERE last_ip = NEW.last_ip AND id != NEW.id;

        IF overlap_count > 0 OR EXISTS (SELECT 1 FROM public.banned_ips WHERE ip = NEW.last_ip) THEN
            INSERT INTO public.site_notifications (title, short_description, content_html, is_active, show_minimal, target_role)
            VALUES (
                'Security Alert: IP Overlap', 
                'Suspicious signup detected from blocked or multi-use IP.',
                '<p>A user (' || COALESCE(NEW.email, 'Anonymous') || ') joined from IP <strong>' || NEW.last_ip || '</strong> which is used by ' || overlap_count || ' other accounts or is in the ban list.</p>',
                true,
                true,
                'admin'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_ip_update
AFTER UPDATE OF last_ip ON public.profiles
FOR EACH ROW
WHEN (OLD.last_ip IS DISTINCT FROM NEW.last_ip)
EXECUTE FUNCTION notify_ip_overlap();
