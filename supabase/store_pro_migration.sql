-- 1. GST & Pricing Improvements for Products
ALTER TABLE public.store_products 
ADD COLUMN IF NOT EXISTS gst_percentage INTEGER DEFAULT 18;

-- 2. Store Coupons Table
CREATE TABLE IF NOT EXISTS public.store_coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT CHECK (discount_type IN ('percent', 'fixed')) NOT NULL,
    discount_value DECIMAL(12,2) NOT NULL,
    min_order_amount DECIMAL(12,2) DEFAULT 0,
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_until TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Detailed Order Columns
ALTER TABLE public.store_orders
ADD COLUMN IF NOT EXISTS subtotal DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS coupon_id UUID REFERENCES public.store_coupons(id),
ADD COLUMN IF NOT EXISTS gst_percentage INTEGER;

-- Fix/Ensure relationship to Profiles for easier joins
-- This is often the cause of 400 errors in complex joins
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'store_orders_user_id_fkey_profiles'
    ) THEN
        ALTER TABLE public.store_orders 
        ADD CONSTRAINT store_orders_user_id_fkey_profiles 
        FOREIGN KEY (user_id) REFERENCES public.profiles(id);
    END IF;
END $$;

-- 4. Order Items GST Tracking
ALTER TABLE public.store_order_items
ADD COLUMN IF NOT EXISTS unit_tax_amount DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS total_tax_amount DECIMAL(12,2);

-- 5. Status Check Improvement
-- Drop the old restricted constraint if it exists (name varies depending on how it was created, but usually store_orders_status_check)
ALTER TABLE public.store_orders 
DROP CONSTRAINT IF EXISTS store_orders_status_check;

-- Add updated constraint including 'refunded'
ALTER TABLE public.store_orders 
ADD CONSTRAINT store_orders_status_check 
CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'));

-- 6. RLS for Coupons
ALTER TABLE public.store_coupons ENABLE ROW LEVEL SECURITY;

-- Drop existing if any to avoid errors on retry
DROP POLICY IF EXISTS "Allow public coupon validation" ON public.store_coupons;
DROP POLICY IF EXISTS "Admin full access to coupons" ON public.store_coupons;

CREATE POLICY "Allow public coupon validation" 
ON public.store_coupons FOR SELECT 
USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

CREATE POLICY "Admin full access to coupons" 
ON public.store_coupons FOR ALL 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR role = 'sub_admin')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR role = 'sub_admin')
    )
);
