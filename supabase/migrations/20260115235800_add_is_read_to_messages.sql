-- Add is_read to admission_messages
ALTER TABLE public.admission_messages 
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- Ensure is_read is in admission_offers (it should be there from previous migration, but being safe)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admission_offers' AND column_name = 'is_read') THEN
        ALTER TABLE public.admission_offers ADD COLUMN is_read BOOLEAN DEFAULT FALSE;
    END IF;
END $$;
