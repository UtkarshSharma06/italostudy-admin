-- Allow creators to update their communities
CREATE POLICY "Creators can update their communities"
    ON public.communities
    FOR UPDATE
    USING (auth.uid() = created_by);

-- Allow creators to delete their communities
CREATE POLICY "Creators can delete their communities"
    ON public.communities
    FOR DELETE
    USING (auth.uid() = created_by);
