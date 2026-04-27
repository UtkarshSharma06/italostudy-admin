-- Admission Concierge System Schema

-- 1. Admission Applications
CREATE TABLE IF NOT EXISTS public.admission_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    university_name TEXT,
    course_name TEXT,
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'pending', 'under_review', 'documents_required', 'accepted', 'rejected')),
    progress_percentage INTEGER DEFAULT 0,
    consultant_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Admission Documents
CREATE TABLE IF NOT EXISTS public.admission_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.admission_applications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    document_type TEXT NOT NULL, -- e.g., 'passport', 'transcript', 'cv', 'language_cert'
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Admission Consultation Messages
CREATE TABLE IF NOT EXISTS public.admission_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.admission_applications(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) NOT NULL,
    content TEXT NOT NULL,
    is_from_consultant BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_messages ENABLE ROW LEVEL SECURITY;

-- Policies for admission_applications
CREATE POLICY "Users can view their own applications" 
ON public.admission_applications FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
ON public.admission_applications FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications" 
ON public.admission_applications FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Policies for admission_documents
CREATE POLICY "Users can manage their own documents" 
ON public.admission_documents FOR ALL TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all documents" 
ON public.admission_documents FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Policies for admission_messages
CREATE POLICY "Users can view messages for their applications" 
ON public.admission_messages FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admission_applications WHERE id = application_id AND user_id = auth.uid()));

CREATE POLICY "Users can send messages to their applications" 
ON public.admission_messages FOR INSERT TO authenticated 
WITH CHECK (EXISTS (SELECT 1 FROM public.admission_applications WHERE id = application_id AND user_id = auth.uid()));

CREATE POLICY "Admins can view and reply to all messages" 
ON public.admission_messages FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Create storage bucket for admission-docs if it doesn't exist
-- Note: This usually requires a separate Supabase CLI or Dashboard action but we track it here.
-- INSERT INTO storage.buckets (id, name, public) VALUES ('admission-docs', 'admission-docs', false) ON CONFLICT DO NOTHING;
