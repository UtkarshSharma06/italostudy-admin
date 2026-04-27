-- Seed Data: Dummy Transactions
-- Date: 2026-02-04

DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Try to get a real user ID to link to, otherwise use null or a placeholder if constraints allow
    -- For seed data, we usually want at least one valid user if possible.
    -- We'll just fetch the first non-admin user found, or the current user if running manually.
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    -- If no user exists, we can't easily seed valid FKs without creating one. 
    -- Assuming dev environment has at least one user.
    
    IF v_user_id IS NOT NULL THEN
        -- Insert dummy transactions
        INSERT INTO public.transactions (user_id, amount, currency, status, payment_method, plan_id, created_at)
        VALUES 
            (v_user_id, 29.99, 'EUR', 'completed', 'stripe', 'monthly_pro', now() - interval '2 hours'),
            (v_user_id, 99.00, 'USD', 'completed', 'paypal', 'yearly_basic', now() - interval '1 day'),
            (v_user_id, 499.00, 'INR', 'failed', 'razorpay', 'monthly_starter', now() - interval '3 days'),
            (v_user_id, 45.00, 'EUR', 'completed', 'lemonsqueezy', 'lifetime_deal', now() - interval '5 days'),
            (v_user_id, 12.00, 'EUR', 'refunded', 'stripe', 'monthly_pro', now() - interval '1 week');
            
        -- Add a few more for "other" users (random UUIDs won't work due to FK constraint, so we reuse the same user or just skip)
        -- In a real seed we might create dummy users first.
    END IF;
END $$;
