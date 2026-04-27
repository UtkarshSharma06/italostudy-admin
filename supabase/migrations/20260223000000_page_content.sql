-- Creates a CMS content table for CENT-S cluster pages.
-- Admins can edit page content from the admin panel without code changes.

CREATE TABLE IF NOT EXISTS public.page_content (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug    text NOT NULL,
  field_key    text NOT NULL,
  field_value  text NOT NULL DEFAULT '',
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page_slug, field_key)
);

-- Update timestamp automatically
CREATE OR REPLACE FUNCTION update_page_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION update_page_content_timestamp();

-- RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read (needed by live pages server-side or client-side)
CREATE POLICY "Public read page_content"
  ON public.page_content FOR SELECT
  USING (true);

-- Authenticated users (admins) can write
CREATE POLICY "Authenticated write page_content"
  ON public.page_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
