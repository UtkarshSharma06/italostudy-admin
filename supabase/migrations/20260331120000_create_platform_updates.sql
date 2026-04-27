-- Create platform_updates table
CREATE TABLE IF NOT EXISTS public.platform_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    update_date DATE NOT NULL DEFAULT CURRENT_DATE,
    update_type TEXT NOT NULL CHECK (update_type IN ('questions', 'difficulty', 'feature', 'content', 'fix')),
    tags TEXT[] DEFAULT '{}',
    count_text TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.platform_updates ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Everyone can read updates
CREATE POLICY "Allow public read access for platform_updates"
ON public.platform_updates
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can manage updates
CREATE POLICY "Allow admin full access for platform_updates"
ON public.platform_updates
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'admin' OR profiles.email = 'contact@italostudy.com')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND (profiles.role = 'admin' OR profiles.email = 'contact@italostudy.com')
    )
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_platform_updates_updated_at
    BEFORE UPDATE ON public.platform_updates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed initial data from the current status.html (optional but helpful)
INSERT INTO public.platform_updates (title, description, update_date, update_type, tags, count_text)
VALUES 
('80 new IMAT Biology questions added with difficulty ratings', 'Added a fresh batch of cell biology and genetics questions, each tagged with Easy / Medium / Hard difficulty so you can target your weak spots. Questions sourced from past IMAT papers 2019–2024.', '2026-03-31', 'questions', ARRAY['IMAT', 'Biology', 'Cell Biology', 'Genetics'], '+80 questions'),
('Dodo Payments checkout integrated', 'You can now purchase ItaloStudy Premium with a secure Dodo Payments checkout — no hidden redirects. Payment is verified server-side via Edge Functions before access is granted.', '2026-03-30', 'feature', ARRAY['Premium', 'Payments', 'Security'], NULL),
('TOLC-MED Chemistry bank expanded', '60 organic chemistry questions added covering reactions, functional groups, and stereochemistry. All questions include detailed step-by-step image explanations.', '2026-03-28', 'questions', ARRAY['TOLC-MED', 'Chemistry', 'Organic Chem'], '+60 questions'),
('TOLC Ultimate Guide published', 'A comprehensive, SEO-optimized authority guide covering everything about TOLC-MED and TOLC-I — eligibility, structure, syllabus, universities, and prep strategy. 6,000+ words.', '2026-03-28', 'content', ARRAY['TOLC-MED', 'TOLC-I', 'Guide', 'Authority Content'], NULL),
('Difficulty levels applied to all existing Math questions', 'We retroactively reviewed and applied Easy / Medium / Hard ratings to all 340 existing Mathematics questions. The filter on the Q&A page now lets you drill Hard questions only.', '2026-03-26', 'difficulty', ARRAY['Mathematics', 'IMAT', 'TOLC-I', 'All Exams'], NULL);
