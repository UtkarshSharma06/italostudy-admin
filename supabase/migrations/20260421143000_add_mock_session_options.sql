-- Migration: Add mock session configuration options
-- Description: Adds is_sections_locked and section_timing_mode to mock_sessions and tests tables.

ALTER TABLE public.mock_sessions 
ADD COLUMN IF NOT EXISTS is_sections_locked BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS section_timing_mode TEXT DEFAULT 'section' CHECK (section_timing_mode IN ('section', 'total'));

ALTER TABLE public.tests
ADD COLUMN IF NOT EXISTS is_sections_locked BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS section_timing_mode TEXT DEFAULT 'section' CHECK (section_timing_mode IN ('section', 'total'));

-- Comment on columns
COMMENT ON COLUMN public.mock_sessions.is_sections_locked IS 'Whether students are locked within sections (cannot navigate back)';
COMMENT ON COLUMN public.mock_sessions.section_timing_mode IS 'Timing mode: section-wise timing or total exam timing';

COMMENT ON COLUMN public.tests.is_sections_locked IS 'Snapshot of session configuration at start of test';
COMMENT ON COLUMN public.tests.section_timing_mode IS 'Snapshot of session configuration at start of test';
