-- Add is_active flag to all hierarchy tables
ALTER TABLE public.learning_exams ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.learning_courses ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.learning_topics ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.learning_units ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.learning_subunits ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.learning_content ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add shortcut foreign keys to learning_content to allow skipping levels
ALTER TABLE public.learning_content ADD COLUMN IF NOT EXISTS unit_id UUID REFERENCES public.learning_units(id) ON DELETE CASCADE;
ALTER TABLE public.learning_content ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES public.learning_topics(id) ON DELETE CASCADE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_unit_id ON public.learning_content(unit_id);
CREATE INDEX IF NOT EXISTS idx_content_topic_id ON public.learning_content(topic_id);
