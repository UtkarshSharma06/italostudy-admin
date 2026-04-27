-- Add exam_type to topic_performance to separate stats per exam
ALTER TABLE public.topic_performance 
ADD COLUMN IF NOT EXISTS exam_type TEXT DEFAULT 'cent-s-prep';

-- Add exam_type to saved_questions for better filtering
ALTER TABLE public.saved_questions 
ADD COLUMN IF NOT EXISTS exam_type TEXT DEFAULT 'cent-s-prep';

-- Update uniqueness constraint on topic_performance to include exam_type
ALTER TABLE public.topic_performance 
DROP CONSTRAINT IF EXISTS topic_performance_user_id_subject_topic_key;

ALTER TABLE public.topic_performance 
ADD CONSTRAINT topic_performance_user_id_subject_topic_exam_key 
UNIQUE(user_id, subject, topic, exam_type);

-- Filter top students by exam in analytics queries
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    user_id,
    exam_type,
    SUM(correct_answers) as total_correct,
    COUNT(id) as tests_taken
FROM public.tests
WHERE status = 'completed'
GROUP BY user_id, exam_type;
