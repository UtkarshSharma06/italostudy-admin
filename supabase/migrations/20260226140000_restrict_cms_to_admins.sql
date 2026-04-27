-- Restrict page_content write access to admins only
-- This overrides the loose 'authenticated' policy previously set.

DROP POLICY IF EXISTS "Authenticated write page_content" ON public.page_content;

CREATE POLICY "Admins only write page_content"
  ON public.page_content
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Ensure public read remains
DROP POLICY IF EXISTS "Public read page_content" ON public.page_content;
CREATE POLICY "Public read page_content"
  ON public.page_content FOR SELECT
  USING (true);
