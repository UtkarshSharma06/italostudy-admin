-- Enable Realtime for Chat and Communities (Idempotent)

-- 1. Community Messages
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;
EXCEPTION WHEN duplicate_object OR sqlstate '42710' THEN
  NULL;
END $$;

-- 2. Communities
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.communities;
EXCEPTION WHEN duplicate_object OR sqlstate '42710' THEN
  NULL;
END $$;

-- 3. Profiles
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
EXCEPTION WHEN duplicate_object OR sqlstate '42710' THEN
  NULL;
END $$;

-- 4. Chat Mentions
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_mentions;
EXCEPTION WHEN duplicate_object OR sqlstate '42710' THEN
  NULL;
END $$;
