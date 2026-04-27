-- Create session_registrations table
CREATE TABLE IF NOT EXISTS public.session_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES public.mock_sessions(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, session_id)
);

-- Enable RLS on session_registrations
ALTER TABLE public.session_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own registrations" ON public.session_registrations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for sessions" ON public.session_registrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add session_id to tests table to link attempts to sessions
ALTER TABLE public.tests
ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES public.mock_sessions(id) ON DELETE SET NULL;

-- Add is_official flag to mock_sessions
ALTER TABLE public.mock_sessions
ADD COLUMN IF NOT EXISTS is_official BOOLEAN DEFAULT false;

-- Add index for performance check
CREATE INDEX IF NOT EXISTS idx_tests_session_id ON public.tests(session_id);
CREATE INDEX IF NOT EXISTS idx_registrations_session_id ON public.session_registrations(session_id);
