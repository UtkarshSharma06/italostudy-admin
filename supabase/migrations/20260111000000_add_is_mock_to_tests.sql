-- Add is_mock column to tests table to distinguish between practice and mock exams
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tests' AND column_name='is_mock') THEN
        ALTER TABLE public.tests ADD COLUMN is_mock BOOLEAN DEFAULT false;
    END IF;
END $$;
