-- Add restricted flag to communities
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS is_restricted BOOLEAN DEFAULT false;

-- Policy: Who can INSERT messages?
-- Drop existing insert policy if it exists (generic name assumption, or we create a new comprehensive one)
DROP POLICY IF EXISTS "Users can insert messages" ON public.community_messages;
DROP POLICY IF EXISTS "Authenticated users can insert messages" ON public.community_messages;

CREATE POLICY "Users can insert messages"
ON public.community_messages
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND
  (
    -- Community is OPEN
    (SELECT is_restricted FROM public.communities WHERE id = community_id) = false
    OR
    -- OR User is Admin
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  )
);

-- Policy: Who can DELETE messages?
-- Users can delete their own. Admins can delete ANY.
DROP POLICY IF EXISTS "Users can delete own messages" ON public.community_messages;

CREATE POLICY "Users can delete messages"
ON public.community_messages
FOR DELETE
USING (
  (auth.uid() = user_id) -- Own message
  OR
  ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin') -- Admin
);

-- Policy: Who can UPDATE communities (to toggle restriction)?
-- Only Admins.
DROP POLICY IF EXISTS "Admins can update communities" ON public.communities;

CREATE POLICY "Admins can update communities"
ON public.communities
FOR UPDATE
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
