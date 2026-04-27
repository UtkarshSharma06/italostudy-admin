-- 1. Ensure 'admission-docs' bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('admission-docs', 'admission-docs', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Ensure 'community-uploads' bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('community-uploads', 'community-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Policy: admission-docs Select (Owner)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can view their own admission docs'
    ) THEN
        CREATE POLICY "Users can view their own admission docs"
        ON storage.objects FOR SELECT TO authenticated
        USING (
            bucket_id = 'admission-docs' AND
            (storage.foldername(name))[1] = auth.uid()::text
        );
    END IF;
END $$;

-- 4. Policy: admission-docs Insert (Owner)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can upload their own admission docs'
    ) THEN
        CREATE POLICY "Users can upload their own admission docs"
        ON storage.objects FOR INSERT TO authenticated
        WITH CHECK (
            bucket_id = 'admission-docs' AND
            (storage.foldername(name))[1] = auth.uid()::text
        );
    END IF;
END $$;

-- 5. Policy: admission-docs Select (Consultant/Admin)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Consultants can view all admission docs'
    ) THEN
        CREATE POLICY "Consultants can view all admission docs"
        ON storage.objects FOR SELECT TO authenticated
        USING (
            bucket_id = 'admission-docs' AND
            EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'consultant'))
        );
    END IF;
END $$;

-- 6. Policy: community-uploads Public Read
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public Read Access - community'
    ) THEN
        CREATE POLICY "Public Read Access - community"
        ON storage.objects FOR SELECT
        USING ( bucket_id = 'community-uploads' );
    END IF;
END $$;

-- 7. Policy: community-uploads Authenticated Upload
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated Uploads - community'
    ) THEN
        CREATE POLICY "Authenticated Uploads - community"
        ON storage.objects FOR INSERT
        WITH CHECK (
            bucket_id = 'community-uploads' AND
            auth.role() = 'authenticated'
        );
    END IF;
END $$;
