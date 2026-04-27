-- Add title column to writing_tasks table
ALTER TABLE public.writing_tasks ADD COLUMN IF NOT EXISTS title TEXT;
