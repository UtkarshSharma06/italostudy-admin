-- Create Learning Comments Table
CREATE TABLE IF NOT EXISTS public.learning_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_id UUID REFERENCES public.learning_content(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.learning_comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read on comments" ON public.learning_comments FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to post comments" ON public.learning_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow users to delete their own comments" ON public.learning_comments FOR DELETE USING (auth.uid() = user_id);
