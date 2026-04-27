-- Allow nullable title and add show_minimal column
ALTER TABLE public.site_notifications 
ALTER COLUMN title DROP NOT NULL,
ADD COLUMN IF NOT EXISTS show_minimal BOOLEAN DEFAULT false;
