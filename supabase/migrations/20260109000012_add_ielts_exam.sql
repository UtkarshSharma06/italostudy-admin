-- Add IELTS exam to learning system
INSERT INTO public.learning_exams (name, description) VALUES 
('IELTS', 'International English Language Testing System - Academic and General Training');

-- Get the IELTS exam ID for reference (for manual use or future queries)
-- SELECT id FROM public.learning_exams WHERE name = 'IELTS';
