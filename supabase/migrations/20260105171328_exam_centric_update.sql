-- Add exam_type to track which exam a test/question belongs to
ALTER TABLE public.tests ADD COLUMN IF NOT EXISTS exam_type TEXT DEFAULT 'cens-prep';
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS exam_type TEXT DEFAULT 'cens-prep';

-- Create proctoring_logs table for cheat detection
CREATE TABLE IF NOT EXISTS public.proctoring_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    violation_type TEXT NOT NULL, -- 'tab_switch', 'fullscreen_exit', 'camera_off', etc.
    details TEXT,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_proctoring_test_id ON public.proctoring_logs(test_id);
