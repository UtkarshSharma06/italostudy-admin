-- Create table for modular learning quiz questions
CREATE TABLE IF NOT EXISTS public.learning_quiz_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES public.learning_topics(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES public.learning_units(id) ON DELETE CASCADE,
    subunit_id UUID REFERENCES public.learning_subunits(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_index INTEGER NOT NULL,
    explanation TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.learning_quiz_questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read on quiz questions" 
ON public.learning_quiz_questions FOR SELECT USING (true);

-- Allow authenticated (admin) write access
CREATE POLICY "Allow authenticated full access on quiz questions" 
ON public.learning_quiz_questions FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_topic ON public.learning_quiz_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_quiz_unit ON public.learning_quiz_questions(unit_id);
CREATE INDEX IF NOT EXISTS idx_quiz_subunit ON public.learning_quiz_questions(subunit_id);
