-- Migration: Message Retention Policy (20 Days)

-- 1. Create the cleanup function
CREATE OR REPLACE FUNCTION public.delete_expired_messages()
RETURNS void AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.community_messages
    WHERE created_at < (now() - INTERVAL '20 days');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % expired messages.', deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Grant permission to run it (service role/postgres)
GRANT EXECUTE ON FUNCTION public.delete_expired_messages TO postgres, service_role;

-- 3. Enable pg_cron if possible and schedule the job
-- Note: pg_cron must be enabled in the Dashboard > Database > Extensions for some plans
DO $$
BEGIN
    -- Check if pg_cron is available to be created
    IF EXISTS (select * from pg_available_extensions where name = 'pg_cron') THEN
        CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
        
        -- Schedule daily at 3 AM
        -- We use a DO block to avoid error if cron schema is not accessible in search_path
        PERFORM extensions.cron.schedule('delete-expired-messages-daily', '0 3 * * *', 'SELECT public.delete_expired_messages()');
    ELSE
        RAISE NOTICE 'pg_cron extension not available. Please run "SELECT public.delete_expired_messages();" manually or via an external cron job.';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not schedule cron job automatically: %. Please execute cleanups manually.', SQLERRM;
END $$;
