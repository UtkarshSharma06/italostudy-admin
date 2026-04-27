-- Migration: Admin View Permissions for Student Activity
-- Date: 2026-02-04

-- Helper function to check if current user is admin (optional but cleaner)
-- Using the EXISTS pattern directly in policies is standard here.

-- 1. tests
CREATE POLICY "Admins can view all tests" ON public.tests
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- 2. user_practice_responses
CREATE POLICY "Admins can view all practice responses" ON public.user_practice_responses
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- 3. learning_progress
CREATE POLICY "Admins can view all learning progress" ON public.learning_progress
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- 4. mock_exam_submissions
CREATE POLICY "Admins can view all mock submissions" ON public.mock_exam_submissions
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- 5. module submissions (Reading, Listening, Writing, Speaking)
CREATE POLICY "Admins can view all reading submissions" ON public.reading_submissions
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')));

CREATE POLICY "Admins can view all listening submissions" ON public.listening_submissions
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')));

CREATE POLICY "Admins can view all writing submissions" ON public.writing_submissions
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')));

CREATE POLICY "Admins can view all speaking sessions" ON public.speaking_sessions
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')));
