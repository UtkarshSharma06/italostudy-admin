-- Fix the unique constraint on community_calls
-- The previous constraint UNIQUE (community_id, is_active) prevented more than one inactive call.
-- We want only ONE active call per community, but infinite inactive calls.

ALTER TABLE public.community_calls DROP CONSTRAINT IF EXISTS active_call_per_community;

CREATE UNIQUE INDEX IF NOT EXISTS active_call_per_community 
ON public.community_calls (community_id) 
WHERE (is_active = true);

-- Update RLS to allow admins to end calls even if they are not members
DROP POLICY IF EXISTS "Participants can end calls" ON public.community_calls;
CREATE POLICY "Participants and admins can end calls" ON public.community_calls
    FOR UPDATE USING (
        auth.uid() = created_by OR 
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM public.community_members
            WHERE community_id = community_calls.community_id
            AND user_id = auth.uid()
            AND (status = 'approved' OR status = 'member')
        )
    ) WITH CHECK (
        is_active = false
    );
