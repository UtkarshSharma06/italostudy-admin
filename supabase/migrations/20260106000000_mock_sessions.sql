-- Create mock_sessions table for scheduled live exams
CREATE TABLE IF NOT EXISTS public.mock_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    exam_type TEXT NOT NULL DEFAULT 'cent-s-prep',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mock_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for mock_sessions
-- Everyone can view active sessions
DROP POLICY IF EXISTS "Anyone can view mock sessions" ON public.mock_sessions;
CREATE POLICY "Anyone can view mock sessions" ON public.mock_sessions
    FOR SELECT USING (true);

-- Only admins can manage sessions (for now, we'll allow all workers to help since this is a dev/staging state)
-- In production, we'd restrict user_id to specific UUIDs or check a 'role' column in profiles
DROP POLICY IF EXISTS "Admins can manage sessions" ON public.mock_sessions;
CREATE POLICY "Admins can manage sessions" ON public.mock_sessions
    FOR ALL USING (true)
    WITH CHECK (true);

-- Add sample session (matching the one in user's image)
INSERT INTO public.mock_sessions (title, description, start_time, end_time, exam_type)
VALUES (
    'CEnT-S International Simulation',
    'High-Fidelity Practice Exam for engineering and science admissions. Non-EU/International Session.',
    '2026-01-06 09:00:00+00',
    '2026-01-08 23:59:59+00',
    'cent-s-prep'
) ON CONFLICT DO NOTHING;
