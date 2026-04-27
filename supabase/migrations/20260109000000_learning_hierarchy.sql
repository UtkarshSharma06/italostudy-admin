-- Create Hierarchical Learning System Tables

CREATE TABLE IF NOT EXISTS public.learning_exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learning_courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id UUID REFERENCES public.learning_exams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learning_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.learning_courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learning_units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES public.learning_topics(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learning_subunits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_id UUID REFERENCES public.learning_units(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learning_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subunit_id UUID REFERENCES public.learning_subunits(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    video_url TEXT,
    embed_code TEXT,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS (Row Level Security)
ALTER TABLE public.learning_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_subunits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read on exams" ON public.learning_exams FOR SELECT USING (true);
CREATE POLICY "Allow public read on courses" ON public.learning_courses FOR SELECT USING (true);
CREATE POLICY "Allow public read on topics" ON public.learning_topics FOR SELECT USING (true);
CREATE POLICY "Allow public read on units" ON public.learning_units FOR SELECT USING (true);
CREATE POLICY "Allow public read on subunits" ON public.learning_subunits FOR SELECT USING (true);
CREATE POLICY "Allow public read on content" ON public.learning_content FOR SELECT USING (true);

-- Allow authenticated (admin) write access - assuming service_role or specific admin check
-- For now, allowing all authenticated for simplicity in this dev environment, or ideally restricted
CREATE POLICY "Allow authenticated full access on learning" ON public.learning_exams FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on courses" ON public.learning_courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on topics" ON public.learning_topics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on units" ON public.learning_units FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on subunits" ON public.learning_subunits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on content" ON public.learning_content FOR ALL USING (auth.role() = 'authenticated');
