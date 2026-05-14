-- Migration: Replace fake marketing metrics with real platform metrics
-- Date: 2026-05-14
--
-- Removed:
--   - top_zero_search   (queried analytics_events.zero_result_search — never fired)
--   - total_events      (COUNT(*) FROM analytics_events — table is empty)
--
-- Added:
--   - avg_mock_score          = AVG score of all completed mock tests (real)
--   - total_practice_sessions = COUNT of rows in user_practice_responses (real)

CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    total_users             INT;
    new_users_today         INT;
    total_visitors          INT;
    unique_visitors_today   INT;
    active_subscriptions    INT;
    active_bans_count       INT DEFAULT 0;

    -- Real activity-based metrics
    weekly_active_users     INT;
    monthly_active_users    INT;
    unique_active_today     INT;
    retention_rate_weekly   NUMERIC;
    retention_rate_monthly  NUMERIC;

    top_exams               JSON;
    recent_activity         JSON;

    -- Marketing / Growth (real data only)
    top_utm_source          TEXT;
    avg_mock_score          NUMERIC;   -- replaces top_zero_search
    total_practice_sessions INT;       -- replaces total_events
BEGIN
    -- ── 1. Core counts ────────────────────────────────────────────────────────
    SELECT COUNT(*) INTO total_users FROM public.profiles;

    SELECT COUNT(*) INTO new_users_today
    FROM public.profiles
    WHERE created_at >= CURRENT_DATE;

    -- Legacy site_visits (kept for backward compat)
    SELECT COALESCE(COUNT(*), 0) INTO total_visitors
    FROM public.site_visits
    WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_visits');

    SELECT COALESCE(COUNT(DISTINCT ip_address), 0) INTO unique_visitors_today
    FROM public.site_visits
    WHERE created_at >= CURRENT_DATE
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_visits');

    SELECT COUNT(*) INTO active_subscriptions
    FROM public.profiles
    WHERE selected_plan IN ('pro', 'global', 'elite')
       OR subscription_tier IN ('pro', 'global', 'elite');

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'banned_ips') THEN
        SELECT COUNT(*) INTO active_bans_count FROM public.banned_ips;
    END IF;

    -- ── 2. REAL Activity-Based Metrics ────────────────────────────────────────
    -- Active last 7 days
    SELECT COUNT(DISTINCT u) INTO weekly_active_users FROM (
        SELECT user_id AS u FROM public.user_practice_responses
        WHERE created_at >= NOW() - INTERVAL '7 days'
        UNION
        SELECT user_id AS u FROM public.tests
        WHERE created_at >= NOW() - INTERVAL '7 days'
        UNION
        SELECT user_id AS u FROM public.learning_progress
        WHERE last_accessed_at >= NOW() - INTERVAL '7 days'
    ) activity_7d;

    -- Active last 30 days
    SELECT COUNT(DISTINCT u) INTO monthly_active_users FROM (
        SELECT user_id AS u FROM public.user_practice_responses
        WHERE created_at >= NOW() - INTERVAL '30 days'
        UNION
        SELECT user_id AS u FROM public.tests
        WHERE created_at >= NOW() - INTERVAL '30 days'
        UNION
        SELECT user_id AS u FROM public.learning_progress
        WHERE last_accessed_at >= NOW() - INTERVAL '30 days'
    ) activity_30d;

    -- Unique active TODAY
    SELECT COUNT(DISTINCT u) INTO unique_active_today FROM (
        SELECT user_id AS u FROM public.user_practice_responses
        WHERE created_at >= CURRENT_DATE
        UNION
        SELECT user_id AS u FROM public.tests
        WHERE created_at >= CURRENT_DATE
    ) activity_today;

    retention_rate_weekly  := CASE WHEN total_users = 0 THEN 0
        ELSE ROUND((weekly_active_users::NUMERIC  / total_users::NUMERIC) * 100, 1) END;
    retention_rate_monthly := CASE WHEN total_users = 0 THEN 0
        ELSE ROUND((monthly_active_users::NUMERIC / total_users::NUMERIC) * 100, 1) END;

    -- ── 3. Real Marketing / Growth Metrics ────────────────────────────────────
    -- Top UTM source (still real if tracked)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'analytics_events') THEN
        SELECT properties->>'utm_source' INTO top_utm_source
        FROM public.analytics_events
        WHERE properties->>'utm_source' IS NOT NULL
        GROUP BY properties->>'utm_source'
        ORDER BY COUNT(*) DESC
        LIMIT 1;
    END IF;

    -- Average mock score (real — from tests table)
    SELECT COALESCE(ROUND(AVG(score)::NUMERIC, 1), 0) INTO avg_mock_score
    FROM public.tests
    WHERE status = 'completed'
      AND (test_type = 'mock' OR is_mock = true)
      AND score IS NOT NULL;

    -- Total practice sessions answered (real — from user_practice_responses)
    SELECT COALESCE(COUNT(*), 0) INTO total_practice_sessions
    FROM public.user_practice_responses;

    -- ── 4. Top Exams ──────────────────────────────────────────────────────────
    SELECT COALESCE(json_agg(t), '[]'::json) INTO top_exams FROM (
        SELECT exam_type, COUNT(*) AS count
        FROM public.user_practice_responses
        GROUP BY exam_type
        ORDER BY count DESC
        LIMIT 5
    ) t;

    -- ── 5. Recent Activity ────────────────────────────────────────────────────
    SELECT COALESCE(json_agg(act), '[]'::json) INTO recent_activity FROM (
        (SELECT
            'registration' AS type,
            COALESCE(display_name, 'New Student') AS title,
            'Joined the platform' AS description,
            created_at AS time
        FROM public.profiles
        ORDER BY created_at DESC
        LIMIT 5)
        UNION ALL
        (SELECT
            'practice' AS type,
            'Practice Session' AS title,
            'Answered ' || COUNT(*)::text || ' questions in ' || exam_type AS description,
            MAX(created_at) AS time
        FROM public.user_practice_responses
        WHERE created_at >= NOW() - INTERVAL '24 hours'
        GROUP BY exam_type, user_id
        ORDER BY time DESC
        LIMIT 5)
        ORDER BY time DESC
        LIMIT 10
    ) act;

    -- ── 6. Return ─────────────────────────────────────────────────────────────
    RETURN json_build_object(
        'total_users',              total_users,
        'new_users_today',          new_users_today,
        'total_visitors',           total_visitors,
        'unique_visitors_today',    unique_visitors_today,
        'active_subscriptions',     active_subscriptions,
        'active_bans_count',        active_bans_count,
        -- Real activity
        'weekly_active_users',      weekly_active_users,
        'monthly_active_users',     monthly_active_users,
        'unique_active_today',      unique_active_today,
        'retention_rate_weekly',    COALESCE(retention_rate_weekly, 0),
        'retention_rate_monthly',   COALESCE(retention_rate_monthly, 0),
        -- Real growth metrics (replaced fake ones)
        'top_utm_source',           COALESCE(top_utm_source, 'None'),
        'avg_mock_score',           COALESCE(avg_mock_score, 0),
        'total_practice_sessions',  COALESCE(total_practice_sessions, 0),
        -- Charts
        'top_exams',                top_exams,
        'recent_activity',          recent_activity
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_admin_dashboard_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_admin_dashboard_stats() TO service_role;
