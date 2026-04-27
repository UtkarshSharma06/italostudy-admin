-- Add precise score and penalty columns to tests table
ALTER TABLE public.tests 
ADD COLUMN IF NOT EXISTS precise_score DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS penalty_score DECIMAL(5,2);

-- Update existing records (optional, but good for data consistency)
UPDATE public.tests SET precise_score = score::DECIMAL WHERE precise_score IS NULL;
