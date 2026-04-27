-- Create session_messages table for pre-exam chat
CREATE TABLE IF NOT EXISTS public.session_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.mock_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.session_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view session messages" ON public.session_messages
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can send messages" ON public.session_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable real-time for session_messages
ALTER publication supabase_realtime ADD TABLE public.session_messages;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_session_messages_session_id ON public.session_messages(session_id);
