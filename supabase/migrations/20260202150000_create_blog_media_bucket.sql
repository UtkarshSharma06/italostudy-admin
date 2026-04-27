-- Create 'blog-media' bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public Read Access
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public Read Access - blog-media'
    ) THEN
        CREATE POLICY "Public Read Access - blog-media"
        ON storage.objects FOR SELECT
        USING ( bucket_id = 'blog-media' );
    END IF;
END $$;

-- Policy: Authenticated Upload (Admin/Consultant Only ideally, but auth is fine for now)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated Uploads - blog-media'
    ) THEN
        CREATE POLICY "Authenticated Uploads - blog-media"
        ON storage.objects FOR INSERT
        WITH CHECK (
            bucket_id = 'blog-media' AND
            auth.role() = 'authenticated'
        );
    END IF;
END $$;
