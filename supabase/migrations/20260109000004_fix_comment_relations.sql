-- Comprehensive fix for Learning Comments System
-- 1. Ensure parent_id exists for threading
-- 2. Ensure explicit Foreign Key to public.profiles for joining

-- PART A: THREADING SUPPORT (Redundant check if you ran the previous one, but safe)
ALTER TABLE public.learning_comments 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES public.learning_comments(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.learning_comments(parent_id);

-- PART B: PROFILE RELATIONSHIP FIX
-- PostgREST needs an explicit FK to public.profiles to allow embedding (select=*,profiles(...))
-- We add a second FK validation to the same column.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'learning_comments_user_id_profiles_fkey' 
        AND table_name = 'learning_comments'
    ) THEN
        ALTER TABLE public.learning_comments
        ADD CONSTRAINT learning_comments_user_id_profiles_fkey
        FOREIGN KEY (user_id) REFERENCES public.profiles(id)
        ON DELETE CASCADE;
    END IF;
END $$;

-- PART C: REFRESH SCEMA CACHE NOTICE
NOTIFY pgrst, 'reload config';
