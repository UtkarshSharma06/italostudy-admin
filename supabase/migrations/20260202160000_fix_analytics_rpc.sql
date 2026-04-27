-- Update the Admin Dashboard RPC for real-time popularity tracking
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
    
    -- Total Global Visitors
    SELECT COUNT(*) INTO total_visitors FROM public.site_visits;
    
    -- Unique Visitors Today
    SELECT COUNT(DISTINCT ip_address) INTO unique_visitors_today FROM public.site_visits
    WHERE created_at >= CURRENT_DATE;
    
    -- Active Plans
    SELECT COUNT(*) INTO active_subscriptions FROM public.profiles
    WHERE selected_plan IN ('pro', 'elite');

    -- Active Bans
    SELECT COUNT(*) INTO active_bans_count FROM public.banned_ips;
    
    -- Retention (Last 7 days active)
    SELECT 
        CASE 
            WHEN total_users = 0 THEN 0 
            ELSE ROUND((COUNT(DISTINCT profiles.id)::NUMERIC / total_users::NUMERIC) * 100, 1)
        END INTO retention_rate
    FROM public.profiles
    JOIN public.site_visits ON site_visits.ip_address = profiles.last_ip
    WHERE site_visits.created_at >= NOW() - INTERVAL '7 days';
    
    -- Accurate Top Exams (Combining Mock Results and Practice Responses)
    SELECT json_agg(t) INTO top_exams FROM (
        SELECT exam_type, SUM(total_count) as count
        FROM (
            SELECT exam_type, COUNT(*) as total_count FROM public.mock_results GROUP BY exam_type
            UNION ALL
            SELECT exam_type, COUNT(*) as total_count FROM public.user_practice_responses GROUP BY exam_type
        ) combined
        GROUP BY exam_type
        ORDER BY count DESC
        LIMIT 5
    ) t;

    -- Recent Activity (Signup, Mock Exam finish, Visit)
    SELECT json_agg(act) INTO recent_activity FROM (
        (SELECT 
            'registration' as type,
            COALESCE(display_name, 'New Student') as title,
            'Created an account' as description,
            created_at as time
        FROM public.profiles
        ORDER BY created_at DESC
        LIMIT 2)
        UNION ALL
        (SELECT 
            'exam' as type,
            COALESCE(p.display_name, 'Student') as title,
            'Finished ' || r.exam_type as description,
            r.created_at as time
        FROM public.mock_results r
        JOIN public.profiles p ON p.id = r.user_id
        ORDER BY r.created_at DESC
        LIMIT 2)
        UNION ALL
        (SELECT 
            'visit' as type,
            'Activity' as title,
            'Viewed ' || path as description,
            created_at as time
        FROM public.site_visits
        ORDER BY created_at DESC
        LIMIT 2)
        ORDER BY time DESC
        LIMIT 6
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
