-- Add parent_id to support threaded replies in learning comments
ALTER TABLE public.learning_comments 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES public.learning_comments(id) ON DELETE CASCADE;

-- Add index for reply fetching performance
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.learning_comments(parent_id);
