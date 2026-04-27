-- Run this in Supabase SQL Editor to add tracking_url and notes columns
-- needed for the admin order management panel

ALTER TABLE public.store_orders
  ADD COLUMN IF NOT EXISTS tracking_url   TEXT,
  ADD COLUMN IF NOT EXISTS admin_notes    TEXT,
  ADD COLUMN IF NOT EXISTS refund_reason  TEXT;

-- Allow users to INSERT their own orders (needed for checkout)
DROP POLICY IF EXISTS "User Orders Insert" ON public.store_orders;
CREATE POLICY "User Orders Insert" ON public.store_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to INSERT their own order items
DROP POLICY IF EXISTS "User Order Items Insert" ON public.store_order_items;
CREATE POLICY "User Order Items Insert" ON public.store_order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM store_orders WHERE id = order_id AND user_id = auth.uid())
  );

-- Allow admins to update orders (status, tracking, notes)
DROP POLICY IF EXISTS "Admin Orders Update" ON public.store_orders;
CREATE POLICY "Admin Orders Update" ON public.store_orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sub_admin'))
  );

-- ✅ Done. Now checkout and admin order management will work.
