-- Migration: Create Coupons Table
-- Date: 2026-02-04

-- Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
    discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
    valid_from TIMESTAMPTZ DEFAULT now(),
    valid_until TIMESTAMPTZ,
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Policy: Admins have full access
CREATE POLICY "Admins can manage coupons" 
ON public.coupons 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- Policy: No public access to list/read coupons directly
-- (Validation will be done via secure RPC function)

-- Index for faster lookup by code
CREATE INDEX IF NOT EXISTS coupons_code_idx ON public.coupons (code);
