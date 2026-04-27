ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS community_enabled BOOLEAN DEFAULT true;
