-- Make session_id nullable in mock_exam_submissions
-- This allows users to practice past mock tests without a specific session

ALTER TABLE public.mock_exam_submissions 
  ALTER COLUMN session_id DROP NOT NULL;
