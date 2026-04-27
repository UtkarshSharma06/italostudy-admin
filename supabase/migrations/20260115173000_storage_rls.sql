-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('admission-docs', 'admission-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload their own admission docs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'admission-docs' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow authenticated users to view their own admission docs
CREATE POLICY "Users can view their own admission docs"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'admission-docs' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow consultants/admins to view all docs (optional, but good for dashboard)
CREATE POLICY "Consultants can view all admission docs"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'admission-docs' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'consultant'))
);
