-- Create table for tracking quiz completion and scores
CREATE TABLE IF NOT EXISTS public.learning_quiz_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES public.learning_topics(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES public.learning_units(id) ON DELETE CASCADE,
    subunit_id UUID REFERENCES public.learning_subunits(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Ensure one record per user per specific quiz parent
    -- Note: We allow nulls in other ID columns but the combination must be unique
    CONSTRAINT quiz_unique_topic UNIQUE NULLS NOT DISTINCT (user_id, topic_id),
    CONSTRAINT quiz_unique_unit UNIQUE NULLS NOT DISTINCT (user_id, unit_id),
    CONSTRAINT quiz_unique_subunit UNIQUE NULLS NOT DISTINCT (user_id, subunit_id)
);

-- Active RLS
ALTER TABLE public.learning_quiz_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own quiz progress" 
ON public.learning_quiz_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert their own quiz progress" 
ON public.learning_quiz_progress FOR ALL
USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_progress_user ON public.learning_quiz_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_progress_topic ON public.learning_quiz_progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_quiz_progress_unit ON public.learning_quiz_progress(unit_id);
CREATE INDEX IF NOT EXISTS idx_quiz_progress_subunit ON public.learning_quiz_progress(subunit_id);
