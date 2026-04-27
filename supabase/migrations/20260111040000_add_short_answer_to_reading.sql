ALTER TABLE public.reading_questions DROP CONSTRAINT IF EXISTS reading_questions_question_type_check;
ALTER TABLE public.reading_questions ADD CONSTRAINT reading_questions_question_type_check CHECK (question_type in ('mcq', 'bool', 'gap', 'short_answer'));
