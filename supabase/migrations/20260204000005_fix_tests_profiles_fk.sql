-- Add foreign key relationship to profiles table for the tests table
-- This allows PostgREST embedding for queries that need profile information (display_name, email)
-- Required for MockResultsViewer.tsx for non-IELTS mock sessions

ALTER TABLE public.tests
DROP CONSTRAINT IF EXISTS fk_tests_profiles;

ALTER TABLE public.tests
ADD CONSTRAINT fk_tests_profiles
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;
