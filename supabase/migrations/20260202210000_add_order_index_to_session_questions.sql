-- Add order_index column to session_questions table for question ordering
ALTER TABLE public.session_questions 
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_session_questions_order ON public.session_questions(session_id, order_index);
