-- Add stage column to questions to track adaptive batches
ALTER TABLE public.questions 
ADD COLUMN IF NOT EXISTS stage integer DEFAULT 1;

-- Add mode and current_stage to tests
ALTER TABLE public.tests
ADD COLUMN IF NOT EXISTS mode text DEFAULT 'standard' CHECK (mode IN ('standard', 'adaptive', 'weak_area', 'exam_sim')),
ADD COLUMN IF NOT EXISTS current_stage integer DEFAULT 1;

-- Create saved_questions table for Bookmarks
CREATE TABLE IF NOT EXISTS public.saved_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE SET NULL,
  question_data JSONB NOT NULL, -- Snapshot of question in case it's deleted
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on saved_questions
ALTER TABLE public.saved_questions ENABLE ROW LEVEL SECURITY;

-- Policies for saved_questions
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can view own saved questions') THEN
        CREATE POLICY "Users can view own saved questions" ON public.saved_questions
          FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can insert own saved questions') THEN
        CREATE POLICY "Users can insert own saved questions" ON public.saved_questions
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can update own saved questions') THEN
        CREATE POLICY "Users can update own saved questions" ON public.saved_questions
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can delete own saved questions') THEN
        CREATE POLICY "Users can delete own saved questions" ON public.saved_questions
          FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_saved_questions_user_id ON public.saved_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_tests_mode ON public.tests(mode);
