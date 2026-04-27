-- Migration: 20260216100000_add_delete_policy_to_reports.sql
-- Goal: Allow admins to delete question reports (currently restricted by RLS)

-- Admins can delete any report
DROP POLICY IF EXISTS "Admins can delete all question reports" ON public.question_reports;
CREATE POLICY "Admins can delete all question reports"
    ON public.question_reports
    FOR DELETE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

COMMENT ON POLICY "Admins can delete all question reports" ON public.question_reports IS 'Allows users with admin role to delete any question report';
