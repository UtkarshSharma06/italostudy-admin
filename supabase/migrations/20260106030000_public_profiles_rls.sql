-- Update profiles RLS to allow authenticated users to see other users' basic info
-- This is necessary for the chat to display names correctly
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (auth.role() = 'authenticated');

-- Note: We already have "Users can view own profile" but it uses auth.uid() = id. 
-- The new policy is more permissive for authenticated users.

