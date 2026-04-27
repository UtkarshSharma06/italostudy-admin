-- Add advanced columns to store_products
ALTER TABLE store_products
ADD COLUMN IF NOT EXISTS download_url TEXT,
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES store_categories(id),
ADD COLUMN IF NOT EXISTS is_bundle BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS bundle_items UUID[] DEFAULT '{}';

-- Ensure images is text[] if it isn't already (standardizing)
-- (Checking if it's already an array, if not we might need a more complex migration, 
-- but based on the code it's expected to be an array)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'store_products' AND column_name = 'images' AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE store_products 
        ALTER COLUMN images TYPE TEXT[] USING ARRAY[images]::TEXT[];
    END IF;
END $$;
