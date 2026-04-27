-- Migration to fix upvote persistence and implement view counting
-- 1. Add base stats columns to preserve seeded numbers
ALTER TABLE public.qa_questions ADD COLUMN IF NOT EXISTS base_upvotes INTEGER DEFAULT 0;
ALTER TABLE public.qa_questions ADD COLUMN IF NOT EXISTS base_views INTEGER DEFAULT 0;
ALTER TABLE public.qa_answers ADD COLUMN IF NOT EXISTS base_upvotes INTEGER DEFAULT 0;

-- 2. Update toggle_qa_vote to include base_upvotes in the total
CREATE OR REPLACE FUNCTION toggle_qa_vote(p_target_id UUID, p_target_type TEXT, p_vote_type INT)
RETURNS void AS $$
DECLARE
    v_user_id UUID;
    v_existing_vote INT;
    v_base_upvotes INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Look up existing vote
    SELECT vote_type INTO v_existing_vote FROM public.qa_votes WHERE user_id = v_user_id AND target_id = p_target_id;

    IF v_existing_vote IS NULL THEN
        INSERT INTO public.qa_votes (user_id, target_id, target_type, vote_type) 
        VALUES (v_user_id, p_target_id, p_target_type, p_vote_type);
    ELSIF v_existing_vote = p_vote_type THEN
        DELETE FROM public.qa_votes WHERE user_id = v_user_id AND target_id = p_target_id;
    ELSE
        UPDATE public.qa_votes SET vote_type = p_vote_type WHERE user_id = v_user_id AND target_id = p_target_id;
    END IF;

    -- Update total score = base_upvotes + sum(qa_votes)
    IF p_target_type = 'question' THEN
        SELECT COALESCE(base_upvotes, 0) INTO v_base_upvotes FROM public.qa_questions WHERE id = p_target_id;
        UPDATE public.qa_questions
        SET upvotes = v_base_upvotes + (SELECT COALESCE(SUM(vote_type), 0) FROM public.qa_votes WHERE target_id = p_target_id)
        WHERE id = p_target_id;
    ELSE
        SELECT COALESCE(base_upvotes, 0) INTO v_base_upvotes FROM public.qa_answers WHERE id = p_target_id;
        UPDATE public.qa_answers
        SET upvotes = v_base_upvotes + (SELECT COALESCE(SUM(vote_type), 0) FROM public.qa_votes WHERE target_id = p_target_id)
        WHERE id = p_target_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Implement increment_qa_views RPC
CREATE OR REPLACE FUNCTION increment_qa_views(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.qa_questions
  SET views = COALESCE(views, 0) + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
