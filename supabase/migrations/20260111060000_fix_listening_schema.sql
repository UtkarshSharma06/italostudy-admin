
-- Add content column to listening_parts
ALTER TABLE public.listening_parts ADD COLUMN IF NOT EXISTS content text;

-- Update listening_questions type constraint
ALTER TABLE public.listening_questions DROP CONSTRAINT IF EXISTS listening_questions_question_type_check;
ALTER TABLE public.listening_questions ADD CONSTRAINT listening_questions_question_type_check 
    CHECK (question_type IN ('mcq', 'bool', 'gap', 'map', 'multi_select', 'short_answer'));

-- Ensure submissions table exists (it was in the main migration but good to be safe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'listening_submissions') THEN
        CREATE TABLE public.listening_submissions (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id uuid REFERENCES auth.users(id),
            test_id uuid REFERENCES public.listening_tests(id),
            score numeric,
            answers jsonb,
            created_at timestamptz DEFAULT now()
        );
        ALTER TABLE public.listening_submissions ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Users manage listening subs" ON public.listening_submissions FOR ALL TO authenticated USING (auth.uid() = user_id);
    END IF;
END $$;
