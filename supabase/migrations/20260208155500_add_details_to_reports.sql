-- Migration: 20260208155500_add_details_to_reports.sql
-- Goal: Add 'details' column to question_reports table and ensure unique constraint on bookmarks

DO $$ 
BEGIN
    -- 1. Add details column to question_reports if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'question_reports' AND column_name = 'details') THEN
        ALTER TABLE public.question_reports ADD COLUMN details TEXT;
    END IF;

    -- 2. Add unique constraint to bookmarked_questions for upsert support
    -- This ensures (user_id, question_id) is unique, allowing ON CONFLICT updates.
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'bookmarked_questions_user_question_key'
    ) THEN
        ALTER TABLE public.bookmarked_questions 
        ADD CONSTRAINT bookmarked_questions_user_question_key UNIQUE (user_id, question_id);
    END IF;
END $$;
