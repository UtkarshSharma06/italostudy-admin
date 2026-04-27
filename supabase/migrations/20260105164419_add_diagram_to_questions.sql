-- Add diagram column to the questions table
ALTER TABLE public.questions 
ADD COLUMN IF NOT EXISTS diagram JSONB DEFAULT NULL;
