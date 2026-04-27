-- Migration: Premium Status Hub Expansion
-- Adds detailed fields for Icons, Types, Dates, Hero Features, and Testimonials

-- 1. Update Platform Updates Table
ALTER TABLE public.platform_updates 
ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'zap',
ADD COLUMN IF NOT EXISTS update_type TEXT DEFAULT 'NEW', -- NEW, IMPROVED, ENHANCED, ADDED
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Platform';

-- 2. Update Roadmap Table
ALTER TABLE public.platform_roadmap
ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'layout',
ADD COLUMN IF NOT EXISTS target_date TEXT DEFAULT 'Upcoming';

-- 3. Expand Global Configuration Table
ALTER TABLE public.platform_config
ADD COLUMN IF NOT EXISTS hero_feature_json JSONB DEFAULT '{
    "title": "Adaptive Mock Tests",
    "description": "Personalized difficulty based on your performance.",
    "tags": ["Smart analytics", "IMAT & CEnT-S focused"],
    "status_text": "In Progress - Launching May 2025",
    "progress": 75,
    "icon": "brain"
}'::jsonb,
ADD COLUMN IF NOT EXISTS testimonial_json JSONB DEFAULT '{
    "quote": "The updated mocks were much closer to the actual IMAT. Italostudy really helped me improve my accuracy!",
    "author": "Ananya, India",
    "role": "IMAT 2024 Aspirant",
    "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
}'::jsonb;

-- 4. Seed New-style Data
DELETE FROM public.platform_system_status;
INSERT INTO public.platform_system_status (name, status, order_index) VALUES
('Platform & Website', 'operational', 1),
('Mock Tests', 'operational', 2);

DELETE FROM public.platform_updates;
INSERT INTO public.platform_updates (title, description, update_type, category, icon, update_date) VALUES
('IMAT Mock Tests – 2025 Pattern Update', 'Updated question style and difficulty to closely match the latest IMAT exam. More scenario-based and tricky questions added.', 'NEW', 'IMAT Prep', 'edit', '2025-04-22'),
('Performance Analytics Dashboard', 'Now you can track your weak topics, accuracy trends, and rank predictor after every mock test.', 'IMPROVED', 'Analytics', 'bar-chart', '2025-04-18'),
('Detailed Explanations – Step by Step', 'Upgraded solution videos with clearer logic and faster delivery. Available for all new mocks.', 'ENHANCED', 'Learning', 'book-open', '2025-04-12'),
('300+ High-Difficulty Practice Questions', 'New question bank for advanced learners. Based on real 2024/25 exam trends.', 'ADDED', 'Practice', 'help-circle', '2025-04-10');

DELETE FROM public.platform_roadmap;
INSERT INTO public.platform_roadmap (title, description, status, target_date, icon, order_index) VALUES
('Adaptive Mock Tests', 'AI-powered difficulty that adjusts to your performance', 'in_progress', 'May 2025', 'brain', 1),
('Rank Predictor', 'Get an estimated rank based on your mock performance', 'researching', 'June 2025', 'target', 2),
('Live Doubt Sessions', 'Weekly sessions with toppers & mentors', 'backlog', 'July 2025', 'play', 3);
