-- Add missing columns to profiles table that the dodo-webhook tries to update
-- Without these columns the PATCH fails and subscription never activates

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS payment_provider TEXT,
  ADD COLUMN IF NOT EXISTS provider_subscription_id TEXT;

-- Comment for documentation
COMMENT ON COLUMN public.profiles.payment_provider IS 'Last payment provider used: dodo, razorpay, cashfree, paypal, etc.';
COMMENT ON COLUMN public.profiles.provider_subscription_id IS 'Subscription or transaction ID from the payment provider for cancellation';
