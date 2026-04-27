-- Add progress tracking columns to tests table for auto-save functionality
ALTER TABLE public.tests 
ADD COLUMN IF NOT EXISTS current_question_index INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_remaining_seconds INTEGER,
ADD COLUMN IF NOT EXISTS section_time_remaining_seconds INTEGER,
ADD COLUMN IF NOT EXISTS current_section_index INTEGER DEFAULT 0;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tests_progress ON public.tests(id, status) WHERE status = 'in_progress';
