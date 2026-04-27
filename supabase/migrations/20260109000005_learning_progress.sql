-- Create Learning Progress Table to track user activity
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content_id UUID REFERENCES public.learning_content(id) ON DELETE CASCADE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    UNIQUE(user_id, content_id)
);

-- Active RLS
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own progress" 
ON public.learning_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update their own progress" 
ON public.learning_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.learning_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Index for fast retrieval of "Last Played"
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_accessed 
ON public.learning_progress(user_id, last_accessed_at DESC);
