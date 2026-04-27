-- Enable Realtime for profiles to support instant banning/restriction
alter publication supabase_realtime add table profiles;

-- Ensure communities is also tracked for chat locking
alter publication supabase_realtime add table communities;
