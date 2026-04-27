-- Add is_mock_only column to IELTS module tables
ALTER TABLE public.reading_tests ADD COLUMN is_mock_only BOOLEAN DEFAULT FALSE;
ALTER TABLE public.listening_tests ADD COLUMN is_mock_only BOOLEAN DEFAULT FALSE;
ALTER TABLE public.writing_tasks ADD COLUMN is_mock_only BOOLEAN DEFAULT FALSE;
