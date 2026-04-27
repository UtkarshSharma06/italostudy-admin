-- 1. FIX ADMISSION OFFERS RLS (DATABASE)
-- Drop existing policy to refine it
DROP POLICY IF EXISTS "Consultants manage offers" ON admission_offers;

-- Add granular policies for admission_offers
CREATE POLICY "Consultants can view all offers"
ON admission_offers FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (role = 'consultant' OR role = 'admin')
    )
);

CREATE POLICY "Consultants can insert offers"
ON admission_offers FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (role = 'consultant' OR role = 'admin')
    )
);

CREATE POLICY "Consultants can delete offers"
ON admission_offers FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND (role = 'consultant' OR role = 'admin')
    )
);


-- 2. FIX STORAGE RLS (REQUIRED FOR ATTACHMENTS)
-- Allow consultants to upload to ANY folder in admission-docs (folder name is application_id)
DROP POLICY IF EXISTS "Consultants can upload admission docs" ON storage.objects;
CREATE POLICY "Consultants can upload admission docs" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
    bucket_id = 'admission-docs' AND 
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND (role = 'consultant' OR role = 'admin')
    )
);

-- Ensure they can also view what they upload (if they don't already have access via folder name)
DROP POLICY IF EXISTS "Consultants can view all admission docs" ON storage.objects;
CREATE POLICY "Consultants can view all admission docs"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'admission-docs' AND
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'consultant' OR role = 'admin')
    )
);

-- Allow consultants to delete their own uploads if needed (for later)
DROP POLICY IF EXISTS "Consultants can delete admission docs" ON storage.objects;
CREATE POLICY "Consultants can delete admission docs"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'admission-docs' AND
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'consultant' OR role = 'admin')
    )
);
