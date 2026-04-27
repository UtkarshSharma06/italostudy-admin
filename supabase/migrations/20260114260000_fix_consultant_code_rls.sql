-- Allow anon users to check access codes for activation
DROP POLICY IF EXISTS "Anyone can check access codes" ON public.consultant_access_codes;
CREATE POLICY "Anyone can check access codes"
ON public.consultant_access_codes FOR SELECT TO anon, authenticated
USING (NOT is_used);
