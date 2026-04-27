-- Add category column to communities table
ALTER TABLE public.communities ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'GLOBAL';

-- Update existing communities with appropriate categories
UPDATE public.communities SET category = 'EXAM PREP' WHERE name ILIKE '%CENT%' OR name ILIKE '%IMAT%' OR name ILIKE '%SAT%' OR name ILIKE '%IELTS%';
UPDATE public.communities SET category = 'GLOBAL' WHERE name = 'General';
