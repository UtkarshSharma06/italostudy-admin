-- Migration: Add missing scoring columns to tests table
-- Date: 2026-03-06

ALTER TABLE public.tests 
ADD COLUMN IF NOT EXISTS correct_answers INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS wrong_answers INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS skipped_answers INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_taken_seconds INTEGER DEFAULT 0;

-- Comment for clarity
COMMENT ON COLUMN public.tests.correct_answers IS 'Number of correctly answered questions in this test session';
COMMENT ON COLUMN public.tests.wrong_answers IS 'Number of incorrectly answered questions in this test session';
COMMENT ON COLUMN public.tests.skipped_answers IS 'Number of questions skipped in this test session';
