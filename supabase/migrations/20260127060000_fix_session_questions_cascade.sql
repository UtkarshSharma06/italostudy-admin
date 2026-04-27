-- Migration: Fix CASCADE DELETE on session_questions
-- Date: 2026-01-27
-- Purpose: Prevent automatic deletion of questions when mock sessions are removed

-- Drop the existing foreign key constraint that causes cascade deletion
ALTER TABLE public.session_questions
DROP CONSTRAINT IF EXISTS session_questions_session_id_fkey;

-- Make session_id nullable to allow orphaned questions
ALTER TABLE public.session_questions
ALTER COLUMN session_id DROP NOT NULL;

-- Add new constraint with SET NULL instead of CASCADE
-- This preserves questions even if the session is deleted
ALTER TABLE public.session_questions
ADD CONSTRAINT session_questions_session_id_fkey
FOREIGN KEY (session_id) 
REFERENCES public.mock_sessions(id) 
ON DELETE SET NULL;

-- Add a comment explaining the change
COMMENT ON COLUMN public.session_questions.session_id IS 
'References mock_sessions. Can be NULL if session is deleted. Questions are preserved for historical/practice purposes.';
