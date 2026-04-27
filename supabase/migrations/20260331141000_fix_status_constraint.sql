-- Migration: Fix Platform Updates Constraint
-- Drops the restrictive check constraint and adds the new premium types

-- 1. Drop existing constraint
ALTER TABLE public.platform_updates 
DROP CONSTRAINT IF EXISTS platform_updates_update_type_check;

-- 2. Add expanded constraint
ALTER TABLE public.platform_updates 
ADD CONSTRAINT platform_updates_update_type_check 
CHECK (update_type IN ('questions', 'difficulty', 'feature', 'content', 'fix', 'NEW', 'IMPROVED', 'ENHANCED', 'ADDED'));

-- 3. Retry Seed Data (from the premium migration that failed)
DELETE FROM public.platform_updates;
INSERT INTO public.platform_updates (title, description, update_type, category, icon, update_date) VALUES
('IMAT Mock Tests – 2025 Pattern Update', 'Updated question style and difficulty to closely match the latest IMAT exam. More scenario-based and tricky questions added.', 'NEW', 'IMAT Prep', 'edit', '2025-04-22'),
('Performance Analytics Dashboard', 'Now you can track your weak topics, accuracy trends, and rank predictor after every mock test.', 'IMPROVED', 'Analytics', 'bar-chart', '2025-04-18'),
('Detailed Explanations – Step by Step', 'Upgraded solution videos with clearer logic and faster delivery. Available for all new mocks.', 'ENHANCED', 'Learning', 'book-open', '2025-04-12'),
('300+ High-Difficulty Practice Questions', 'New question bank for advanced learners. Based on real 2024/25 exam trends.', 'ADDED', 'Practice', 'help-circle', '2025-04-10');
