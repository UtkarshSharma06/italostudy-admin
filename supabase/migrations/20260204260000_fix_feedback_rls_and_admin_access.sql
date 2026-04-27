-- Increase character limit for feedback reviews
ALTER TABLE public.feedback DROP CONSTRAINT IF EXISTS feedback_review_check;
ALTER TABLE public.feedback ADD CONSTRAINT feedback_review_check CHECK (char_length(review) <= 3000);

-- Drop restrictive policies if they exist to replace them with comprehensive ones
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins can update all feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins can delete all feedback" ON public.feedback;

-- 1. Admins and Sub-Admins can view ALL feedback
CREATE POLICY "Admins can view all feedback"
    ON public.feedback
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'sub_admin')
        )
    );

-- 2. Admins and Sub-Admins can update feedback (for status management)
CREATE POLICY "Admins can update all feedback"
    ON public.feedback
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'sub_admin')
        )
    );

-- 3. Admins and Sub-Admins can delete any feedback
CREATE POLICY "Admins can delete all feedback"
    ON public.feedback
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'sub_admin')
        )
    );

-- Ensure authenticated users have general permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedback TO authenticated;
