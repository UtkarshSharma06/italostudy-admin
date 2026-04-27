-- 1. Unschedule pg_cron job (20-day policy)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_extension 
        JOIN pg_namespace ON pg_extension.extnamespace = pg_namespace.oid 
        WHERE pg_extension.extname = 'pg_cron' AND pg_namespace.nspname = 'extensions'
    ) THEN
        PERFORM extensions.cron.unschedule('delete-expired-messages-daily');
        RAISE NOTICE 'Successfully unscheduled the 20-day retention job.';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'pg_cron cleanup failed or already removed: %', SQLERRM;
END $$;

-- 2. Drop the 24-hour retention trigger and function
DROP TRIGGER IF EXISTS trigger_delete_old_messages ON public.community_messages;
DROP FUNCTION IF EXISTS public.delete_old_community_messages();

-- 3. Redefine the 20-day function to do nothing (for safety)
CREATE OR REPLACE FUNCTION public.delete_expired_messages()
RETURNS void AS $$
BEGIN
    RAISE NOTICE 'Message retention is disabled. No messages were deleted.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
