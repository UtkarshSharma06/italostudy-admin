-- Add slug column to exam_resources table
ALTER TABLE exam_resources ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Generate slugs for existing resources if they don't have one
UPDATE exam_resources SET slug = LOWER(REPLACE(title, ' ', '-')) WHERE slug IS NULL;

-- Make slug NOT NULL after populating
ALTER TABLE exam_resources ALTER COLUMN slug SET NOT NULL;
