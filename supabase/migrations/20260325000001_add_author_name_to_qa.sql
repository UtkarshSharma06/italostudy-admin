-- Add the missing 'author_name' columns to support Guest Posting

ALTER TABLE public.qa_questions 
ADD COLUMN IF NOT EXISTS author_name TEXT;

ALTER TABLE public.qa_answers 
ADD COLUMN IF NOT EXISTS author_name TEXT;
