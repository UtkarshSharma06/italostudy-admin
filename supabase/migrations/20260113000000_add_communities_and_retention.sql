-- Create communities table
CREATE TABLE IF NOT EXISTS public.communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add community_id to messages
ALTER TABLE public.community_messages 
ADD COLUMN IF NOT EXISTS community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE;

-- Create default 'General' community (idempotent)
INSERT INTO public.communities (name, description)
SELECT 'General', 'Global chat for all students'
WHERE NOT EXISTS (SELECT 1 FROM public.communities WHERE name = 'General');

-- Assign existing messages to General community
UPDATE public.community_messages
SET community_id = (SELECT id FROM public.communities WHERE name = 'General' LIMIT 1)
WHERE community_id IS NULL;

-- Enable RLS for communities
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Communities are viewable by everyone"
    ON public.communities FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create communities"
    ON public.communities FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- 24-Hour Retention Function
CREATE OR REPLACE FUNCTION delete_old_community_messages()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.community_messages
  WHERE created_at < NOW() - INTERVAL '24 hours';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run cleanup on every insert
DROP TRIGGER IF EXISTS trigger_delete_old_messages ON public.community_messages;
CREATE TRIGGER trigger_delete_old_messages
AFTER INSERT ON public.community_messages
FOR EACH STATEMENT
EXECUTE FUNCTION delete_old_community_messages();

-- Index for community_id
CREATE INDEX IF NOT EXISTS idx_community_messages_community_id ON public.community_messages(community_id);
