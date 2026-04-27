-- Migration: Add Payment Gateways Config to System Settings
-- Date: 2026-02-04

-- We will store payment keys in the existing system_settings table under a new key 'payment_gateways'
-- Or we can just rely on the existing JSONB structure if it allows arbitrary keys.
-- The system_settings table has (key, value) where value is JSONB.

INSERT INTO public.system_settings (key, value)
VALUES 
(
    'payment_gateways', 
    '{
        "stripe": { "enabled": true, "public_key": "", "secret_key": "" },
        "razorpay": { "enabled": true, "key_id": "", "key_secret": "" },
        "paypal": { "enabled": false, "client_id": "" },
        "lemonsqueezy": { "enabled": false, "store_id": "", "api_key": "" }
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
