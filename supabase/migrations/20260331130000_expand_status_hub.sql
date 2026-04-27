-- Migration: Platform Status Hub Expansion
-- Adds System Status, Roadmap and Global Configuration tracking

-- 1. System Status Table
CREATE TABLE IF NOT EXISTS public.platform_system_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'operational', -- operational, degraded, maintenance, down
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for System Status
ALTER TABLE public.platform_system_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to system status"
ON public.platform_system_status FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow admins full access to system status"
ON public.platform_system_status FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'admin' OR profiles.email = 'itsharma786@gmail.com')
    )
);

-- 2. Roadmap Table
CREATE TABLE IF NOT EXISTS public.platform_roadmap (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'backlog', -- backlog, researching, in_progress, completed
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for Roadmap
ALTER TABLE public.platform_roadmap ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to roadmap"
ON public.platform_roadmap FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow admins full access to roadmap"
ON public.platform_roadmap FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'admin' OR profiles.email = 'itsharma786@gmail.com')
    )
);

-- 3. Global Configuration Table
CREATE TABLE IF NOT EXISTS public.platform_config (
    id TEXT PRIMARY KEY DEFAULT 'global',
    current_session_text TEXT DEFAULT 'CEnT-S April 2026 Session Prep.',
    live_status_percentage INTEGER DEFAULT 80,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for Config
ALTER TABLE public.platform_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to platform config"
ON public.platform_config FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow admins full access to platform config"
ON public.platform_config FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'admin' OR profiles.email = 'itsharma786@gmail.com')
    )
);

-- Insert Default Data
INSERT INTO public.platform_system_status (name, status, order_index) VALUES
('API', 'operational', 1),
('Database', 'operational', 2),
('Mock Test Servers', 'operational', 3);

INSERT INTO public.platform_roadmap (title, description, status, order_index) VALUES
('IMAT 2026 Ultimate Guide PDF Presentation', 'Detailed syllabus breakdown and timing strategies.', 'in_progress', 1),
('Peer Ranking System for Mock Tests', 'Compare your performance with thousand of students.', 'researching', 2),
('Additional TOLC-I Logic Sets', 'Adding 100+ new high-difficulty logic puzzles.', 'backlog', 3);

INSERT INTO public.platform_config (id, current_session_text, live_status_percentage)
VALUES ('global', 'CEnT-S April 2026 Session Prep.', 85)
ON CONFLICT (id) DO NOTHING;
