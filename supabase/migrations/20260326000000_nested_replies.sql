-- Migration to support nested replies (Reddit-style)
-- Adds a parent_id to qa_answers to allow for threading

-- 1. Add parent_id to public.qa_answers
ALTER TABLE public.qa_answers 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES public.qa_answers(id) ON DELETE CASCADE;

-- 2. Create an index for performance when fetching child replies
CREATE INDEX IF NOT EXISTS idx_qa_answers_parent_id ON public.qa_answers(parent_id);

-- 3. Update RLS (already enabled to allow public read/insert, no changes needed but ensuring parity)
-- Policy "Allow public read access to qa_answers" already exists and covers this.
-- Policy "Allow public insert to qa_answers" already exists and covers this.

COMMENT ON COLUMN public.qa_answers.parent_id IS 'Reference to the answer this reply is responding to (enables threading).';
