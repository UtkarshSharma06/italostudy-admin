-- Sync bookmarked_questions schema with latest requirements
DO $$
BEGIN
    -- 1. Add master_question_id if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookmarked_questions' AND column_name = 'master_question_id') THEN
        ALTER TABLE public.bookmarked_questions ADD COLUMN master_question_id UUID;
    END IF;

    -- 2. Add source_table if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookmarked_questions' AND column_name = 'source_table') THEN
        ALTER TABLE public.bookmarked_questions ADD COLUMN source_table TEXT;
    END IF;

    -- 3. Add exam_type if missing (used for mobile bookmark context)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookmarked_questions' AND column_name = 'exam_type') THEN
        ALTER TABLE public.bookmarked_questions ADD COLUMN exam_type TEXT;
    END IF;
END $$;
