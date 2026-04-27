-- Migration: Add attempts limit to mock sessions
-- Date: 2026-01-27

ALTER TABLE public.mock_sessions
ADD COLUMN IF NOT EXISTS attempts_per_person INTEGER DEFAULT 1;

COMMENT ON COLUMN public.mock_sessions.attempts_per_person IS 'Maximum number of attempts allowed per user for this mock session';
