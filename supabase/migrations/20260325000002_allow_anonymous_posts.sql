-- Allow anonymous/guest posts by making user_id optional

ALTER TABLE public.qa_questions 
ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.qa_answers 
ALTER COLUMN user_id DROP NOT NULL;
