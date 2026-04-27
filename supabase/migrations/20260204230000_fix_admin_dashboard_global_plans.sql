-- Fix: Update admin dashboard stats to check for 'global' instead of 'elite'
-- Date: 2026-02-04

CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    total_users INT;
    new_users_today INT;
    total_visitors INT;
    unique_visitors_today INT;
    active_subscriptions INT;
    active_bans_count INT DEFAULT 0;
    retention_rate NUMERIC;
    top_exams JSON;
    recent_activity JSON;
BEGIN
    -- Total User Count
    SELECT COUNT(*) INTO total_users FROM public.profiles;
    
    -- New Users Today
    SELECT COUNT(*) INTO new_users_today FROM public.profiles 
    WHERE created_at >= CURRENT_DATE;
    
    -- Total Global Visitors (handle if table doesn't exist)
    SELECT COALESCE(COUNT(*), 0) INTO total_visitors 
    FROM public.site_visits WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_visits');
    
    -- Unique Visitors Today
    SELECT COALESCE(COUNT(DISTINCT ip_address), 0) INTO unique_visitors_today 
    FROM public.site_visits
    WHERE created_at >= CURRENT_DATE AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_visits');
    
    -- Active Plans - FIXED: Changed 'elite' to 'global' (handles both)
    SELECT COUNT(*) INTO active_subscriptions FROM public.profiles
    WHERE selected_plan IN ('pro', 'global', 'elite') 
       OR subscription_tier IN ('pro', 'global', 'elite');

    -- Active Bans (handle if table doesn't exist)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'banned_ips') THEN
        SELECT COUNT(*) INTO active_bans_count FROM public.banned_ips;
    END IF;
    
    -- Retention (users active in last 7 days) - based on recent signups
    SELECT 
        CASE 
            WHEN total_users = 0 THEN 0 
            ELSE ROUND((COUNT(*)::NUMERIC / total_users::NUMERIC) * 100, 1)
        END INTO retention_rate
    FROM public.profiles
    WHERE created_at >= NOW() - INTERVAL '7 days';
    
    -- Top Exams from practice responses only (mock_results doesn't exist)
    SELECT COALESCE(json_agg(t), '[]'::json) INTO top_exams FROM (
        SELECT exam_type, COUNT(*) as count
        FROM public.user_practice_responses 
        WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_practice_responses')
        GROUP BY exam_type
        ORDER BY count DESC
        LIMIT 5
    ) t;

    -- Recent Activity - only registrations (other tables may not exist)
    SELECT COALESCE(json_agg(act), '[]'::json) INTO recent_activity FROM (
        SELECT 
            'registration' as type,
            COALESCE(display_name, 'New Student') as title,
            'Created an account' as description,
            created_at as time
        FROM public.profiles
        ORDER BY created_at DESC
        LIMIT 10
    ) act;

    RETURN json_build_object(
        'total_users', total_users,
        'new_users_today', new_users_today,
        'total_visitors', total_visitors,
        'unique_visitors_today', unique_visitors_today,
        'active_subscriptions', active_subscriptions,
        'active_bans_count', active_bans_count,
        'retention_rate', COALESCE(retention_rate, 0),
        'top_exams', top_exams,
        'recent_activity', recent_activity
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
