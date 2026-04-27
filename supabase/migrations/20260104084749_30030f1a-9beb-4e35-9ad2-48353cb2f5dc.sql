-- Add proctoring-related columns to tests table
ALTER TABLE public.tests 
ADD COLUMN IF NOT EXISTS test_type text DEFAULT 'practice' CHECK (test_type IN ('practice', 'mock')),
ADD COLUMN IF NOT EXISTS violation_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS proctoring_status text DEFAULT 'not_required' CHECK (proctoring_status IN ('not_required', 'passed', 'submitted', 'disqualified'));

-- Create proctoring_violations table to track individual violations
CREATE TABLE IF NOT EXISTS public.proctoring_violations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id uuid NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  violation_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('warning', 'critical', 'terminal')),
  description text,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on proctoring_violations
ALTER TABLE public.proctoring_violations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for proctoring_violations
CREATE POLICY "Users can insert own violations" 
ON public.proctoring_violations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own violations" 
ON public.proctoring_violations 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add diagram column to questions table
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS diagram jsonb DEFAULT NULL,
ADD COLUMN IF NOT EXISTS time_spent_seconds integer DEFAULT NULL;

-- Create index for faster violation lookups
CREATE INDEX IF NOT EXISTS idx_violations_test_id ON public.proctoring_violations(test_id);
CREATE INDEX IF NOT EXISTS idx_tests_test_type ON public.tests(test_type);