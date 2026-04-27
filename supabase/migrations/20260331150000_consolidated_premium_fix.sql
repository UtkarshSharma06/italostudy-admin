-- Migration: Consolidated Status Hub Fix
-- Adds missing columns, fixes constraints, and seeds premium data

-- 1. Ensure columns exist on platform_updates
ALTER TABLE public.platform_updates ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'zap';
ALTER TABLE public.platform_updates ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Platform';

-- 2. Fix the update_type constraint
ALTER TABLE public.platform_updates DROP CONSTRAINT IF EXISTS platform_updates_update_type_check;
ALTER TABLE public.platform_updates ADD CONSTRAINT platform_updates_update_type_check 
CHECK (update_type IN ('questions', 'difficulty', 'feature', 'content', 'fix', 'NEW', 'IMPROVED', 'ENHANCED', 'ADDED'));

-- 3. Ensure roadmap columns exist
ALTER TABLE public.platform_roadmap ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'layout';
ALTER TABLE public.platform_roadmap ADD COLUMN IF NOT EXISTS target_date TEXT DEFAULT 'Upcoming';

-- 4. Ensure config columns exist
ALTER TABLE public.platform_config ADD COLUMN IF NOT EXISTS hero_feature_json JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.platform_config ADD COLUMN IF NOT EXISTS testimonial_json JSONB DEFAULT '{}'::jsonb;

-- 5. Seed Premium Data (Full Set)
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

UPDATE public.platform_config SET 
hero_feature_json = '{
    "title": "Adaptive Mock Tests",
    "description": "Personalized difficulty based on your performance.",
    "tags": ["Smart analytics", "IMAT & CEnT-S focused"],
    "status_text": "In Progress - Launching May 2025",
    "progress": 75,
    "icon": "brain"
}'::jsonb,
testimonial_json = '{
    "quote": "The updated mocks were much closer to the actual IMAT. Italostudy really helped me improve my accuracy!",
    "author": "Ananya, India",
    "role": "IMAT 2024 Aspirant",
    "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
}'::jsonb
WHERE id = 'global';
