-- Drop the OLD single-parameter function to eliminate overload conflict with new 2-param version.
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/jyjhpqtqbwtxxgijxetq/sql/new

DROP FUNCTION IF EXISTS public.get_mock_leaderboard(TEXT);
