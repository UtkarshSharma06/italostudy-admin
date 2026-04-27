-- Add subject to questions to separate stats by subject even in mock exams
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS subject TEXT;

-- Update existing questions from their test subjects if possible
UPDATE public.questions q
SET subject = t.subject
FROM public.tests t
WHERE q.test_id = t.id AND q.subject IS NULL;
