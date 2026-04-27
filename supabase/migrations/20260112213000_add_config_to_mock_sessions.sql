-- Add config column to mock_sessions to store extra metadata like module associations
ALTER TABLE public.mock_sessions ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}'::jsonb;
