-- Add payment method columns to store orders
ALTER TABLE public.store_orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'SECURE-PAY',
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'completed';

-- Ensure shipping_address index for better search performance
CREATE INDEX IF NOT EXISTS idx_store_orders_user_id ON public.store_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_store_orders_status ON public.store_orders(status);

-- Update RLS to ensure admins can see everything clearly
DROP POLICY IF EXISTS "Admin Orders View All" ON public.store_orders;
CREATE POLICY "Admin Orders View All" ON public.store_orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
    OR user_id = auth.uid()
  );
