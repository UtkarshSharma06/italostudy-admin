-- Add session locking columns to tests table
ALTER TABLE public.tests 
ADD COLUMN IF NOT EXISTS active_session_id TEXT,
ADD COLUMN IF NOT EXISTS last_heartbeat_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Add index for heartbeat checks
CREATE INDEX IF NOT EXISTS idx_tests_heartbeat ON public.tests(last_heartbeat_at) WHERE status = 'in_progress';
