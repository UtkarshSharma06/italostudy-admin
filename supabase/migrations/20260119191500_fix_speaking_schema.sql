-- Migration to fix speaking session schema inconsistencies
-- 1. Add overall_score to speaking_scores
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='speaking_scores' AND column_name='overall_score') THEN
        ALTER TABLE public.speaking_scores ADD COLUMN overall_score numeric;
    END IF;
END $$;

-- 2. Add comment if not already there
COMMENT ON COLUMN public.speaking_scores.overall_score IS 'The calculated average band score for the speaking session.';
