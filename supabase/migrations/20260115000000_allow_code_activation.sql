-- Allow authenticated users to mark their own access code as used during activation
DROP POLICY IF EXISTS "Users can mark their own code as used" ON public.consultant_access_codes;
CREATE POLICY "Users can mark their own code as used"
ON public.consultant_access_codes FOR UPDATE TO authenticated
USING (
    -- Allow update if the code matches the user's email and is not yet used
    protocol_id = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND is_used = false
)
WITH CHECK (
    -- Only allow setting is_used to true and used_by to current user
    is_used = true 
    AND used_by = auth.uid()
);
