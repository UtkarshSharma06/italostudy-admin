-- Update get_admin_dashboard_stats to include real marketing metrics and enhanced activity
-- Date: 2026-04-22

CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    total_users INT;
    new_users_today INT;
    total_visitors INT;
    unique_visitors_today INT;
    active_subscriptions INT;
    active_bans_count INT DEFAULT 0;
    retention_rate_weekly NUMERIC;
    retention_rate_monthly NUMERIC;
    top_exams JSON;
    recent_activity JSON;
    
    -- New Marketing Metrics
    top_utm_source TEXT;
    top_zero_search TEXT;
    total_events INT;
BEGIN
    -- 1. Core Platform Metrics
    SELECT COUNT(*) INTO total_users FROM public.profiles;
    
    SELECT COUNT(*) INTO new_users_today FROM public.profiles 
    WHERE created_at >= CURRENT_DATE;
    
    SELECT COALESCE(COUNT(*), 0) INTO total_visitors 
    FROM public.site_visits WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_visits');
    
    SELECT COALESCE(COUNT(DISTINCT ip_address), 0) INTO unique_visitors_today 
    FROM public.site_visits
    WHERE created_at >= CURRENT_DATE AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_visits');
    
    SELECT COUNT(*) INTO active_subscriptions FROM public.profiles
    WHERE selected_plan IN ('pro', 'global', 'elite') 
       OR subscription_tier IN ('pro', 'global', 'elite');

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'banned_ips') THEN
        SELECT COUNT(*) INTO active_bans_count FROM public.banned_ips;
    END IF;
    
    -- 2. Retention (Activity-based)
    SELECT 
        CASE WHEN total_users = 0 THEN 0 ELSE ROUND((COUNT(*)::NUMERIC / total_users::NUMERIC) * 100, 1) END 
    INTO retention_rate_weekly
    FROM public.profiles WHERE updated_at >= NOW() - INTERVAL '7 days';

    SELECT 
        CASE WHEN total_users = 0 THEN 0 ELSE ROUND((COUNT(*)::NUMERIC / total_users::NUMERIC) * 100, 1) END 
    INTO retention_rate_monthly
    FROM public.profiles WHERE updated_at >= NOW() - INTERVAL '30 days';
    
    -- 3. Marketing Metrics (Real tracking)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'analytics_events') THEN
        -- Top UTM Source
        SELECT properties->>'utm_source' INTO top_utm_source
        FROM public.analytics_events
        WHERE properties->>'utm_source' IS NOT NULL
        GROUP BY properties->>'utm_source'
        ORDER BY COUNT(*) DESC
        LIMIT 1;

        -- Top Zero Search (Content Gap)
        SELECT properties->>'query' INTO top_zero_search
        FROM public.analytics_events
        WHERE event_name = 'zero_result_search'
        GROUP BY properties->>'query'
        ORDER BY COUNT(*) DESC
        LIMIT 1;

        -- Total Events Count
        SELECT COUNT(*) INTO total_events FROM public.analytics_events;
    END IF;

    -- 4. Top Exams
    SELECT COALESCE(json_agg(t), '[]'::json) INTO top_exams FROM (
        SELECT exam_type, COUNT(*) as count
        FROM public.user_practice_responses 
        WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_practice_responses')
        GROUP BY exam_type
        ORDER BY count DESC
        LIMIT 5
    ) t;

    -- 5. Enhanced Recent Activity (Mix of registrations, visits, and searches)
    SELECT COALESCE(json_agg(act), '[]'::json) INTO recent_activity FROM (
        (SELECT 
            'registration' as type,
            COALESCE(display_name, 'New Student') as title,
            'Joined the platform' as description,
            created_at as time
        FROM public.profiles
        ORDER BY created_at DESC
        LIMIT 5)
        UNION ALL
        (SELECT 
            'visit' as type,
            'Site Visit' as title,
            'Accessed ' || path as description,
            created_at as time
        FROM public.site_visits
        ORDER BY created_at DESC
        LIMIT 5)
        ORDER BY time DESC
        LIMIT 10
    ) act;

    RETURN json_build_object(
        'total_users', total_users,
        'new_users_today', new_users_today,
        'total_visitors', total_visitors,
        'unique_visitors_today', unique_visitors_today,
        'active_subscriptions', active_subscriptions,
        'active_bans_count', active_bans_count,
        'retention_rate_weekly', COALESCE(retention_rate_weekly, 0),
        'retention_rate_monthly', COALESCE(retention_rate_monthly, 0),
        'top_exams', top_exams,
        'recent_activity', recent_activity,
        'top_utm_source', COALESCE(top_utm_source, 'None'),
        'top_zero_search', COALESCE(top_zero_search, 'None'),
        'total_events', COALESCE(total_events, 0)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
