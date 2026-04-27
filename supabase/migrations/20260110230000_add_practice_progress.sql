-- Create user_practice_responses table to track solved questions
CREATE TABLE IF NOT EXISTS public.user_practice_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.practice_questions(id) ON DELETE CASCADE,
    exam_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_practice_responses ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can track their own practice progress" ON public.user_practice_responses;
CREATE POLICY "Users can track their own practice progress"
ON public.user_practice_responses FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_practice_responses_user_id ON public.user_practice_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_practice_responses_question_id ON public.user_practice_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_user_practice_responses_exam_subject ON public.user_practice_responses(exam_type, subject);

-- Add unique constraint to prevent duplicate entries for the same question per user
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_question') THEN
        ALTER TABLE public.user_practice_responses ADD CONSTRAINT unique_user_question UNIQUE (user_id, question_id);
    END IF;
END $$;

-- Add link to practice_question_id in questions table (used temporarily during a test session)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='questions' AND column_name='practice_question_id') THEN
        ALTER TABLE public.questions ADD COLUMN practice_question_id UUID REFERENCES public.practice_questions(id) ON DELETE SET NULL;
    END IF;
END $$;
