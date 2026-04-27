-- Add foreign key relationship to profiles table to allow PostgREST embedding
-- This is necessary because the query in MockEvaluationManager.tsx selects profiles(*)

ALTER TABLE public.mock_exam_submissions
ADD CONSTRAINT fk_mock_exam_profiles
FOREIGN KEY (user_id)
REFERENCES public.profiles(id);
