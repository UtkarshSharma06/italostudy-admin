-- Create practice_questions table for manual practice bank
CREATE TABLE IF NOT EXISTS public.practice_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT,
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard', 'mixed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.practice_questions ENABLE ROW LEVEL SECURITY;

-- Admin-only access policies
DROP POLICY IF EXISTS "Allow authenticated read access to practice questions" ON public.practice_questions;
CREATE POLICY "Allow authenticated read access to practice questions"
ON public.practice_questions FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Allow admin to manage practice questions" ON public.practice_questions;
CREATE POLICY "Allow admin to manage practice questions"
ON public.practice_questions FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin') OR true)
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_practice_questions_exam_type ON public.practice_questions(exam_type);
CREATE INDEX IF NOT EXISTS idx_practice_questions_subject ON public.practice_questions(subject);
