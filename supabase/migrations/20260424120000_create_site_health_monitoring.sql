-- Create site_health_logs table
CREATE TABLE IF NOT EXISTS public.site_health_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL CHECK (event_type IN ('error', 'ping', 'performance')),
    severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    url TEXT NOT NULL,
    message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_health_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (for browser-side error logging)
-- We use a simple rate limit check in the future if needed, but for now open INSERT is required for logging anonymous user errors.
CREATE POLICY "Allow public log insertion" 
ON public.site_health_logs FOR INSERT 
WITH CHECK (true);

-- Only admins and service role can view logs
CREATE POLICY "Allow admin view logs" 
ON public.site_health_logs FOR SELECT 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'sub_admin')
    )
);

-- Provide RPC for easy logging (optional but good for consistency)
CREATE OR REPLACE FUNCTION public.log_site_health_event(
    p_event_type TEXT,
    p_severity TEXT,
    p_url TEXT,
    p_message TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'::jsonb
) RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO public.site_health_logs (event_type, severity, url, message, metadata)
    VALUES (p_event_type, p_severity, p_url, p_message, p_metadata)
    RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
