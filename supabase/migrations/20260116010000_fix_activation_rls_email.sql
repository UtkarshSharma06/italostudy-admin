DROP POLICY IF EXISTS "Users can mark their own code as used" ON public.consultant_access_codes;

CREATE POLICY "Users can mark their own code as used"
ON public.consultant_access_codes FOR UPDATE TO authenticated
USING (
    -- Access auth.jwt() to get email instead of querying auth.users table (which is restricted)
    protocol_id = (auth.jwt() ->> 'email')
    AND is_used = false
)
WITH CHECK (
    -- Only allow setting is_used to true and used_by to current user
    is_used = true 
    AND used_by = auth.uid()
);
