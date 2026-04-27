-- Allow users to delete their own applications
CREATE POLICY "Users can delete their own applications"
ON public.admission_applications
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
