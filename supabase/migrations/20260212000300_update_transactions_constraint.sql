-- Migration: Update Transactions Payment Method Constraint
-- Date: 2026-02-12

-- Add 'cashfree' to the allowed payment methods
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_payment_method_check;
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS payment_method_check; -- Fallback if named differently

ALTER TABLE public.transactions ADD CONSTRAINT transactions_payment_method_check 
CHECK (payment_method IN ('stripe', 'razorpay', 'paypal', 'lemonsqueezy', 'cashfree'));
