-- Migration: Automate CEnT-S Seat Scraper
-- Description: Schedules the seat-scraper Edge Function to run every 5 minutes for 24/7 tracking.

-- 1. Enable the required extensions if not already present
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Create a wrapper function to trigger the Edge Function
-- This uses the project's internal URL and service role key (must be configured in vault or env)
CREATE OR REPLACE FUNCTION public.trigger_cents_scraper()
RETURNS void AS $$
BEGIN
  -- We use net.http_post to call the Edge Function
  -- Note: The URL is constructed using the project ID found in config.toml
  -- In production, the Authorization header should be set using a secret
  PERFORM extensions.net_http_post(
    url := 'https://jyjhpqtqbwtxxgijxetq.supabase.co/functions/v1/seat-scraper',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Schedule the job using pg_cron
-- Every 5 minutes (*/5 * * * *)
DO $$
BEGIN
  IF EXISTS (select * from pg_available_extensions where name = 'pg_cron') THEN
    -- Unscheduling existing job if it exists to avoid duplicates
    -- Note: cron.unschedule is the standard way to remove a job
    BEGIN
      PERFORM cron.unschedule('track-cents-seats-10min');
    EXCEPTION WHEN OTHERS THEN
      -- Job might not exist, ignore
    END;
    
    -- Schedule the new job
    PERFORM cron.schedule(
      'track-cents-seats-5min',
      '*/5 * * * *',
      'SELECT public.trigger_cents_scraper();'
    );
  END IF;
END $$;
