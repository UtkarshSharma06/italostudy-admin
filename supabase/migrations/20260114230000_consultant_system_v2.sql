-- 1. Create Consultant Access Codes Table
CREATE TABLE IF NOT EXISTS public.consultant_access_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    created_by UUID REFERENCES auth.users(id),
    used_by UUID REFERENCES auth.users(id)
);

-- 2. Add Meeting Columns to Admission Applications
ALTER TABLE public.admission_applications ADD COLUMN IF NOT EXISTS meeting_link TEXT;
ALTER TABLE public.admission_applications ADD COLUMN IF NOT EXISTS meeting_time TIMESTAMP WITH TIME ZONE;

-- 3. Create Admission Document Requests Table
CREATE TABLE IF NOT EXISTS public.admission_document_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.admission_applications(id) ON DELETE CASCADE,
    requested_document_name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Update Admission Applications RLS
-- Consultants should be able to see all applications
DROP POLICY IF EXISTS "Consultants can view all applications" ON public.admission_applications;
CREATE POLICY "Consultants can view all applications"
ON public.admission_applications FOR SELECT TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'consultant'
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Consultants can update applications" ON public.admission_applications;
CREATE POLICY "Consultants can update applications"
ON public.admission_applications FOR UPDATE TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'consultant'
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 4. Update Admission Documents RLS
DROP POLICY IF EXISTS "Consultants can view all documents" ON public.admission_documents;
CREATE POLICY "Consultants can view all documents"
ON public.admission_documents FOR SELECT TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'consultant'
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 5. Update Admission Messages RLS
DROP POLICY IF EXISTS "Consultants can view all messages" ON public.admission_messages;
CREATE POLICY "Consultants can view all messages"
ON public.admission_messages FOR SELECT TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'consultant'
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Consultants can send messages" ON public.admission_messages;
CREATE POLICY "Consultants can send messages"
ON public.admission_messages FOR INSERT TO authenticated
WITH CHECK (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'consultant'
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 6. Document Requests RLS
ALTER TABLE public.admission_document_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own document requests"
ON public.admission_document_requests FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admission_applications
        WHERE admission_applications.id = admission_document_requests.application_id
        AND admission_applications.user_id = auth.uid()
    )
);

CREATE POLICY "Consultants can manage document requests"
ON public.admission_document_requests FOR ALL TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'consultant'
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 7. Consultant Access Codes RLS (Admin Only)
ALTER TABLE public.consultant_access_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage access codes"
ON public.consultant_access_codes FOR ALL TO authenticated
USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Anyone can check access codes"
ON public.consultant_access_codes FOR SELECT TO authenticated
USING (NOT is_used);
