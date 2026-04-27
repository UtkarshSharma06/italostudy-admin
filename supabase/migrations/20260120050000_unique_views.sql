-- Table to track unique views per user
CREATE TABLE IF NOT EXISTS public.community_message_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message_id UUID REFERENCES public.community_messages(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, message_id)
);

-- Enable RLS
ALTER TABLE public.community_message_views ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own view history
CREATE POLICY "Users can view their own message views"
ON public.community_message_views FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Update the increment function to be unique per user
CREATE OR REPLACE FUNCTION increment_message_view(p_message_id UUID)
RETURNS VOID AS $$
DECLARE
    v_user_id UUID := auth.uid();
BEGIN
    -- Only proceed if user is logged in
    IF v_user_id IS NULL THEN
        RETURN;
    END IF;

    -- Insert view record if it doesn't exist
    INSERT INTO public.community_message_views (user_id, message_id)
    VALUES (v_user_id, p_message_id)
    ON CONFLICT (user_id, message_id) DO NOTHING;

    -- If a new row was inserted, increment the message's view count
    IF FOUND THEN
        UPDATE public.community_messages
        SET view_count = COALESCE(view_count, 0) + 1
        WHERE id = p_message_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
