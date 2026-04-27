-- Add is_starred column to email_metadata
ALTER TABLE IF EXISTS public.email_metadata 
ADD COLUMN IF NOT EXISTS is_starred BOOLEAN DEFAULT false;

-- Add label column to email_metadata for simple labeling
ALTER TABLE IF EXISTS public.email_metadata 
ADD COLUMN IF NOT EXISTS label TEXT;

-- Update the view/policies if needed (usually not if it's just a column)
-- RLS policies usually apply to the whole table, so no changes needed for existing ones
-- but let's re-verify the table
COMMENT ON COLUMN public.email_metadata.is_starred IS 'Whether the email is starred/flagged';
COMMENT ON COLUMN public.email_metadata.label IS 'Optional label for categorizing emails';
