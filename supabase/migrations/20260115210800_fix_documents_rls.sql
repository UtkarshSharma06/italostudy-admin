-- Fix RLS for admission_documents

-- Enable RLS
ALTER TABLE admission_documents ENABLE ROW LEVEL SECURITY;

-- 1. Allow Users to View their own documents
CREATE POLICY "Users can view own documents"
ON admission_documents FOR SELECT
USING (auth.uid() = user_id);

-- 2. Allow Users to Upload (Insert) their own documents
CREATE POLICY "Users can upload own documents"
ON admission_documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. Allow Consultants/Admins to View ALL documents
CREATE POLICY "Consultants and Admins can view all documents"
ON admission_documents FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'consultant' OR profiles.role = 'admin')
  )
);

-- 4. Allow Consultants/Admins to Update/Delete (if needed)
CREATE POLICY "Consultants and Admins can manage all documents"
ON admission_documents FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'consultant' OR profiles.role = 'admin')
  )
);
