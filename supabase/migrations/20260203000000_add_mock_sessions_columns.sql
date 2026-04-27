-- Add missing columns to mock_sessions table
-- These columns are needed for the Admin panel session creation form

-- Add duration column (in minutes)
ALTER TABLE public.mock_sessions 
ADD COLUMN IF NOT EXISTS duration INTEGER DEFAULT 120;

-- Add max_attempts column
ALTER TABLE public.mock_sessions 
ADD COLUMN IF NOT EXISTS max_attempts INTEGER DEFAULT 1;

-- Add is_official column
ALTER TABLE public.mock_sessions 
ADD COLUMN IF NOT EXISTS is_official BOOLEAN DEFAULT false;

-- Add access_type column
ALTER TABLE public.mock_sessions 
ADD COLUMN IF NOT EXISTS access_type TEXT DEFAULT 'open' CHECK (access_type IN ('open', 'request_required'));

-- Comment on columns
COMMENT ON COLUMN public.mock_sessions.duration IS 'Duration of the exam in minutes';
COMMENT ON COLUMN public.mock_sessions.max_attempts IS 'Maximum number of attempts allowed per user';
COMMENT ON COLUMN public.mock_sessions.is_official IS 'Whether this is an official exam session';
COMMENT ON COLUMN public.mock_sessions.access_type IS 'Access type: open or request_required';
