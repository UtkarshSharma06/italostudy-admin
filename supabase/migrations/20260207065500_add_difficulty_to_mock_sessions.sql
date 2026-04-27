-- Add difficulty column to mock_sessions table
ALTER TABLE public.mock_sessions 
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'medium' 
CHECK (difficulty IN ('easy', 'medium', 'hard'));

-- Update existing sessions to have 'medium' difficulty if they don't already
UPDATE public.mock_sessions SET difficulty = 'medium' WHERE difficulty IS NULL;
