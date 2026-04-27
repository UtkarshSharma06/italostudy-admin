-- Add resource fields to learning tables (Safer, idempotent version)
ALTER TABLE learning_topics ADD COLUMN IF NOT EXISTS resource_url TEXT, ADD COLUMN IF NOT EXISTS resource_title TEXT;
ALTER TABLE learning_units ADD COLUMN IF NOT EXISTS resource_url TEXT, ADD COLUMN IF NOT EXISTS resource_title TEXT;
ALTER TABLE learning_subunits ADD COLUMN IF NOT EXISTS resource_url TEXT, ADD COLUMN IF NOT EXISTS resource_title TEXT;
ALTER TABLE learning_content ADD COLUMN IF NOT EXISTS resource_url TEXT, ADD COLUMN IF NOT EXISTS resource_title TEXT;

-- Notify user to apply this
-- (This file needs to be run in the Supabase SQL Editor)
