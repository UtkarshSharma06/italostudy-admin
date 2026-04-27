-- Migration: Create Transactions Table
-- Date: 2026-02-04

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Keep transaction even if user is deleted (audit)
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    currency TEXT NOT NULL DEFAULT 'EUR',
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('stripe', 'razorpay', 'paypal', 'lemonsqueezy')),
    provider_transaction_id TEXT, -- External ID from the provider
    plan_id TEXT, -- e.g. 'monthly_pro', 'yearly_basic'
    coupon_id UUID REFERENCES public.coupons(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Admins have full access
CREATE POLICY "Admins can view all transactions" 
ON public.transactions 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.role = 'sub_admin')
    )
);

-- Policy: Users can view their own transactions
CREATE POLICY "Users can view own transactions" 
ON public.transactions 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON public.transactions (user_id);
CREATE INDEX IF NOT EXISTS transactions_created_at_idx ON public.transactions (created_at DESC);
