-- Create proctoring_violations table
CREATE TABLE IF NOT EXISTS public.proctoring_violations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    violation_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('warning', 'critical', 'terminal')),
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add violation tracking columns to tests table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tests' AND column_name='violation_count') THEN
        ALTER TABLE public.tests ADD COLUMN violation_count INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tests' AND column_name='proctoring_status') THEN
        ALTER TABLE public.tests ADD COLUMN proctoring_status TEXT DEFAULT 'clean' CHECK (proctoring_status IN ('clean', 'flagged', 'disqualified', 'not_applicable'));
    END IF;
END $$;

-- Enable RLS for proctoring_violations
ALTER TABLE public.proctoring_violations ENABLE ROW LEVEL SECURITY;

-- Policies for proctoring_violations
CREATE POLICY "Users can view their own violations"
    ON public.proctoring_violations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all violations"
    ON public.proctoring_violations FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin')));

-- Note: Insert is handled by service role or specific app logic if needed, 
-- but usually the proctoring logic runs on client and inserts directly.
CREATE POLICY "Users can insert their own violations"
    ON public.proctoring_violations FOR INSERT
    WITH CHECK (auth.uid() = user_id);
