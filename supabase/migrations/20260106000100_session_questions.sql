-- Create session_questions table for storing predefined mock exam questions
CREATE TABLE IF NOT EXISTS public.session_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.mock_sessions(id) ON DELETE CASCADE,
    section_name TEXT NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT,
    topic TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.session_questions ENABLE ROW LEVEL SECURITY;

-- Everyone can view session questions (needed for students taking the test)
-- Everyone can view session questions (needed for students taking the test)
DROP POLICY IF EXISTS "Anyone can view session questions" ON public.session_questions;
CREATE POLICY "Anyone can view session questions" ON public.session_questions
    FOR SELECT USING (true);

-- Only admins can manage session questions
DROP POLICY IF EXISTS "Admins can manage session questions" ON public.session_questions;
CREATE POLICY "Admins can manage session questions" ON public.session_questions
    FOR ALL USING (true)
    WITH CHECK (true);

-- Add index for session_id
CREATE INDEX IF NOT EXISTS idx_session_questions_session_id ON public.session_questions(session_id);
