-- Allow users to update their own applications (for autosave and submit)
CREATE POLICY "Users can update their own applications"
ON public.admission_applications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
