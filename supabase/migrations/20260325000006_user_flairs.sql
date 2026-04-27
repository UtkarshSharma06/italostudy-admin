-- Migration: Add User Flairs to Q&A Questions
ALTER TABLE public.qa_questions ADD COLUMN IF NOT EXISTS user_flair TEXT;
