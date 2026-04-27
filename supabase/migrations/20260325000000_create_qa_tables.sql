-- Migration to create the Q&A community tables: qa_questions and qa_answers
-- This will resolve the 400 errors when fetching discussions on /answers

-- 1. Create the qa_questions table
CREATE TABLE IF NOT EXISTS public.qa_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- optional if posted by logged-in user
    author_name TEXT, -- display name for guests
    title TEXT NOT NULL,
    content TEXT,
    exam_type TEXT, -- e.g. 'imat', 'cent-s', 'general'
    slug TEXT UNIQUE,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the qa_answers table
CREATE TABLE IF NOT EXISTS public.qa_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES public.qa_questions(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- optional if posted by logged-in user
    author_name TEXT, -- display name for guests
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    is_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS) policies
ALTER TABLE public.qa_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qa_answers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read questions and answers
CREATE POLICY "Allow public read access to qa_questions" ON public.qa_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to qa_answers" ON public.qa_answers FOR SELECT USING (true);

-- Allow anyone to insert (since we support guest posting)
CREATE POLICY "Allow public insert to qa_questions" ON public.qa_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to qa_answers" ON public.qa_answers FOR INSERT WITH CHECK (true);

-- Allow anyone to upvote (update upvotes/views)
CREATE POLICY "Allow public update to qa_questions" ON public.qa_questions FOR UPDATE USING (true);
CREATE POLICY "Allow public update to qa_answers" ON public.qa_answers FOR UPDATE USING (true);

-- 4. Create proper Foreign Key Indexes for performance
CREATE INDEX IF NOT EXISTS idx_qa_questions_user_id ON public.qa_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_qa_questions_exam_type ON public.qa_questions(exam_type);
CREATE INDEX IF NOT EXISTS idx_qa_questions_slug ON public.qa_questions(slug);
CREATE INDEX IF NOT EXISTS idx_qa_answers_question_id ON public.qa_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_qa_answers_user_id ON public.qa_answers(user_id);

-- 5. Create RPC function for atomic upvoting of questions
CREATE OR REPLACE FUNCTION increment_question_upvote(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.qa_questions
  SET upvotes = upvotes + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
