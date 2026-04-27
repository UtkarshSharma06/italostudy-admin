-- Add is_proctored column to tests table to support proctoring mode selection
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tests' AND column_name='is_proctored') THEN
        ALTER TABLE public.tests ADD COLUMN is_proctored BOOLEAN DEFAULT false;
    END IF;
END $$;
