-- Create mock_exam_submissions table for tracking complete IELTS mock exam attempts
CREATE TABLE IF NOT EXISTS public.mock_exam_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id UUID REFERENCES public.mock_sessions(id) ON DELETE CASCADE NOT NULL,
    
    -- Module Submission IDs (linked to individual module submissions)
    reading_submission_id UUID REFERENCES public.reading_submissions(id) ON DELETE SET NULL,
    listening_submission_id UUID REFERENCES public.listening_submissions(id) ON DELETE SET NULL,
    writing_submission_id UUID REFERENCES public.writing_submissions(id) ON DELETE SET NULL,
    
    -- Overall Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'evaluating', 'completed')),
    
    -- Overall Scores (aggregated after all modules evaluated)
    overall_band DECIMAL(3,1),
    reading_band DECIMAL(3,1),
    listening_band DECIMAL(3,1),
    writing_band DECIMAL(3,1),
    
    -- Metadata
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    evaluated_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add columns to writing_submissions to track mock exam submissions
ALTER TABLE public.writing_submissions ADD COLUMN IF NOT EXISTS is_mock_exam BOOLEAN DEFAULT FALSE;
ALTER TABLE public.writing_submissions ADD COLUMN IF NOT EXISTS mock_submission_id UUID REFERENCES public.mock_exam_submissions(id) ON DELETE CASCADE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_mock_exam_submissions_user_id ON public.mock_exam_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_submissions_session_id ON public.mock_exam_submissions(session_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_submissions_status ON public.mock_exam_submissions(status);
CREATE INDEX IF NOT EXISTS idx_writing_submissions_is_mock_exam ON public.writing_submissions(is_mock_exam);
CREATE INDEX IF NOT EXISTS idx_writing_submissions_mock_submission_id ON public.writing_submissions(mock_submission_id);

-- Enable RLS
ALTER TABLE public.mock_exam_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own mock exam submissions"
    ON public.mock_exam_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mock exam submissions"
    ON public.mock_exam_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mock exam submissions"
    ON public.mock_exam_submissions FOR UPDATE
    USING (auth.uid() = user_id);
