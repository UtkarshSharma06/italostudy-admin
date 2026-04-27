-- Create marketing leads table
CREATE TABLE IF NOT EXISTS public.marketing_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    source TEXT NOT NULL, -- 'resource_download', 'blog_newsletter'
    meta_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.marketing_leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert leads (non-logged in users)
CREATE POLICY "Allow public to insert leads" 
ON public.marketing_leads 
FOR INSERT 
WITH CHECK (true);

-- Only admins can see leads
CREATE POLICY "Only admins can view leads" 
ON public.marketing_leads 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Grant access
GRANT ALL ON public.marketing_leads TO anon;
GRANT ALL ON public.marketing_leads TO authenticated;
GRANT ALL ON public.marketing_leads TO service_role;
