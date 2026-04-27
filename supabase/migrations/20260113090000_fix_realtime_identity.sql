-- Force full row replication for Realtime tables.
-- This is often required for Supabase Realtime to correctly broadcast all column data.

ALTER TABLE public.community_messages REPLICA IDENTITY FULL;
ALTER TABLE public.chat_mentions REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.communities REPLICA IDENTITY FULL;
