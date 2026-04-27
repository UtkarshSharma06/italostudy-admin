-- Fix: Allow users to create their own transactions
-- Date: 2026-02-04

-- Policy: Users can create their own transactions
CREATE POLICY "Users can create own transactions" 
ON public.transactions 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);
