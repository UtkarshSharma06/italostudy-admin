-- Create advanced feedback fields
ALTER TABLE public.feedback
ADD COLUMN IF NOT EXISTS question_quality_rating INTEGER CHECK (question_quality_rating >= 1 AND question_quality_rating <= 5),
ADD COLUMN IF NOT EXISTS mocktest_quality_rating INTEGER CHECK (mocktest_quality_rating >= 1 AND mocktest_quality_rating <= 5),
ADD COLUMN IF NOT EXISTS security_rating INTEGER CHECK (security_rating >= 1 AND security_rating <= 5),
ADD COLUMN IF NOT EXISTS video_lectures_rating INTEGER CHECK (video_lectures_rating >= 1 AND video_lectures_rating <= 5),
ADD COLUMN IF NOT EXISTS ui_ux_rating INTEGER CHECK (ui_ux_rating >= 1 AND ui_ux_rating <= 5);
