-- Admission Offers Table
CREATE TABLE IF NOT EXISTS admission_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES admission_applications(id) ON DELETE CASCADE,
    consultant_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    message TEXT,
    file_path TEXT, -- Optional PDF/Image link
    file_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    is_read BOOLEAN DEFAULT false
);

-- Admission Tasks Table (structured requests for documents/actions)
CREATE TABLE IF NOT EXISTS admission_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES admission_applications(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAUlT 'pending', -- pending, resolved, rejected
    is_standard BOOLEAN DEFAULT false, -- true for standard docs (Passport etc), false for ad-hoc requests
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE admission_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_tasks ENABLE ROW LEVEL SECURITY;

-- Policies for Offers
CREATE POLICY "Users view their own offers" ON admission_offers
    FOR SELECT USING (EXISTS (SELECT 1 FROM admission_applications WHERE admission_applications.id = admission_offers.application_id AND admission_applications.user_id = auth.uid()));

CREATE POLICY "Consultants manage offers" ON admission_offers
    FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND (role = 'consultant' OR role = 'admin')));

-- Policies for Tasks
CREATE POLICY "Users view their own tasks" ON admission_tasks
    FOR SELECT USING (EXISTS (SELECT 1 FROM admission_applications WHERE admission_applications.id = admission_tasks.application_id AND admission_applications.user_id = auth.uid()));

CREATE POLICY "Consultants manage tasks" ON admission_tasks
    FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND (role = 'consultant' OR role = 'admin')));
