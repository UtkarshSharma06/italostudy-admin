-- Create a table to track which seats we have already alerted about
-- This prevents spamming the user every 5 minutes for the same seat
CREATE TABLE IF NOT EXISTS public.scraper_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seat_identifier TEXT NOT NULL, -- Unique string: "University-Date-City"
    found_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB -- Store the full details just in case
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_scraper_logs_identifier ON public.scraper_logs(seat_identifier);
