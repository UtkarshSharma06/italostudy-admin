-- 1. Create the qa_votes table to track authentic user votes
CREATE TABLE IF NOT EXISTS public.qa_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_id UUID NOT NULL,
    target_type TEXT NOT NULL CHECK (target_type IN ('question', 'answer')),
    vote_type INT NOT NULL CHECK (vote_type IN (1, -1)),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, target_id)
);

-- 2. Enable RLS
ALTER TABLE public.qa_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can vote" ON public.qa_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own votes" ON public.qa_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON public.qa_votes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Everyone can read votes" ON public.qa_votes FOR SELECT USING (true);

-- 3. Create the toggle_qa_vote RPC
CREATE OR REPLACE FUNCTION toggle_qa_vote(p_target_id UUID, p_target_type TEXT, p_vote_type INT)
RETURNS void AS $$
DECLARE
    v_user_id UUID;
    v_existing_vote INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Look up existing vote
    SELECT vote_type INTO v_existing_vote FROM public.qa_votes WHERE user_id = v_user_id AND target_id = p_target_id;

    IF v_existing_vote IS NULL THEN
        -- Insert new vote
        INSERT INTO public.qa_votes (user_id, target_id, target_type, vote_type) 
        VALUES (v_user_id, p_target_id, p_target_type, p_vote_type);
    ELSIF v_existing_vote = p_vote_type THEN
        -- Remove vote if clicking same button (toggling off)
        DELETE FROM public.qa_votes WHERE user_id = v_user_id AND target_id = p_target_id;
    ELSE
        -- Change vote if clicking opposite button
        UPDATE public.qa_votes SET vote_type = p_vote_type WHERE user_id = v_user_id AND target_id = p_target_id;
    END IF;

    -- Calculate the net score (upvotes - downvotes)
    IF p_target_type = 'question' THEN
        UPDATE public.qa_questions
        SET upvotes = (SELECT COALESCE(SUM(vote_type), 0) FROM public.qa_votes WHERE target_id = p_target_id)
        WHERE id = p_target_id;
    ELSE
        UPDATE public.qa_answers
        SET upvotes = (SELECT COALESCE(SUM(vote_type), 0) FROM public.qa_votes WHERE target_id = p_target_id)
        WHERE id = p_target_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
