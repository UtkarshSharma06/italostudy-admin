-- Expand feedback table with detailed user experience fields
ALTER TABLE public.feedback
ADD COLUMN IF NOT EXISTS content_quality_rating INTEGER CHECK (content_quality_rating >= 1 AND content_quality_rating <= 5),
ADD COLUMN IF NOT EXISTS explanation_accuracy_rating INTEGER CHECK (explanation_accuracy_rating >= 1 AND explanation_accuracy_rating <= 5),
ADD COLUMN IF NOT EXISTS navigation_ease_rating INTEGER CHECK (navigation_ease_rating >= 1 AND navigation_ease_rating <= 5),
ADD COLUMN IF NOT EXISTS performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 5),
ADD COLUMN IF NOT EXISTS features_used TEXT[],
ADD COLUMN IF NOT EXISTS most_useful_feature TEXT,
ADD COLUMN IF NOT EXISTS liked_most TEXT,
ADD COLUMN IF NOT EXISTS frustrations TEXT,
ADD COLUMN IF NOT EXISTS bugs_experienced BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS bug_details TEXT,
ADD COLUMN IF NOT EXISTS nps_score INTEGER CHECK (nps_score >= 0 AND nps_score <= 10),
ADD COLUMN IF NOT EXISTS nps_reason TEXT,
ADD COLUMN IF NOT EXISTS likelihood_to_continue TEXT;

-- Create indexes for filtering
CREATE INDEX IF NOT EXISTS idx_feedback_content_quality ON public.feedback(content_quality_rating);
CREATE INDEX IF NOT EXISTS idx_feedback_nps ON public.feedback(nps_score);
CREATE INDEX IF NOT EXISTS idx_feedback_bugs ON public.feedback(bugs_experienced);
