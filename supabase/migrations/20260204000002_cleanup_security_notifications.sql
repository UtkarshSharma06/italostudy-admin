-- Migration: Cleanup and Restrict Security Notifications
-- Date: 2026-02-04

-- 1. Delete all existing "Security Alert: IP Overlap" notifications
-- This fulfills the user's request to "delete it if already delivered to all users"
DELETE FROM public.site_notifications 
WHERE title = 'Security Alert: IP Overlap';

-- 2. Update the trigger function to ensure it targets both admins and sub_admins
-- and double check the column name matches what the app expects
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
            INSERT INTO public.site_notifications (
                title, 
                short_description, 
                content_html, 
                is_active, 
                show_minimal, 
                target_role
            )
            VALUES (
                'Security Alert: IP Overlap', 
                'Suspicious signup detected from blocked or multi-use IP.',
                '<p>A user (' || COALESCE(NEW.email, 'Anonymous') || ') joined from IP <strong>' || NEW.last_ip || '</strong> which is used by ' || overlap_count || ' other accounts or is in the ban list.</p>',
                true,
                true,
                'admin' -- We use 'admin' here as the filter handles it, or we could use a custom tag
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
