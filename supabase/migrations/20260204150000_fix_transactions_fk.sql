-- Migration: Fix Transactions Foreign Key
-- Date: 2026-02-04

-- Drop the old constraint referencing auth.users
ALTER TABLE public.transactions
DROP CONSTRAINT IF EXISTS transactions_user_id_fkey;

-- Add new constraint referencing public.profiles
-- This enables PostgREST to automatically detect the relationship for joins like select('*, profiles(*)')
ALTER TABLE public.transactions
ADD CONSTRAINT transactions_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE SET NULL;
