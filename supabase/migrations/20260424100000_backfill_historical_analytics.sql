-- Migration: Backfill Historical Analytics Data
-- Purpose: Retroactively populate the analytics_events table using existing data from profiles, visits, and leads.
-- Date: 2026-04-24

-- 1. Backfill Registrations
INSERT INTO public.analytics_events (event_name, user_id, properties, created_at)
SELECT 
    'registration', 
    id, 
    jsonb_build_object(
        'display_name', COALESCE(display_name, 'Unknown'),
        'country', COALESCE(country, 'Unknown'),
        'last_ip', last_ip
    ), 
    created_at
FROM public.profiles
ON CONFLICT DO NOTHING;

-- 2. Backfill Site Visits
INSERT INTO public.analytics_events (event_name, properties, created_at)
SELECT 
    'page_view', 
    jsonb_build_object(
        'path', path,
        'user_agent', user_agent,
        'ip_address', ip_address
    ), 
    created_at
FROM public.site_visits
ON CONFLICT DO NOTHING;

-- 3. Backfill Lead Sources (This powers the 'Top Source' metric retroactively)
INSERT INTO public.analytics_events (event_name, properties, created_at)
SELECT 
    'lead_capture', 
    jsonb_build_object(
        'utm_source', source,
        'email_masked', left(email, 3) || '***' || right(email, 4),
        'meta', meta_data
    ), 
    created_at
FROM public.marketing_leads
ON CONFLICT DO NOTHING;
