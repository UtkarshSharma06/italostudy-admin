-- Dynamic Duration and Expiry Support Migration
-- Date: 2026-02-05

-- 1. Add duration columns to transactions table if they don't exist
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS duration_value INTEGER,
ADD COLUMN IF NOT EXISTS duration_unit TEXT CHECK (duration_unit IN ('days', 'months', 'years'));

-- 2. Update all order creation RPCs to accept duration
CREATE OR REPLACE FUNCTION create_razorpay_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 30,
    p_duration_unit TEXT DEFAULT 'days'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_key_id TEXT;
    v_transaction_id UUID;
BEGIN
    SELECT value INTO v_config FROM system_settings WHERE key = 'payment_gateways';
    v_key_id := v_config->'razorpay'->>'key_id';

    IF v_key_id IS NULL OR v_key_id = '' THEN
        RETURN jsonb_build_object('error', 'Razorpay not configured');
    END IF;

    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id, duration_value, duration_unit)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'razorpay', p_plan_id, p_coupon_id, p_duration_value, p_duration_unit)
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'key_id', v_key_id,
        'amount', (p_amount * 100)::INTEGER,
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'name', 'ItaloStudy',
        'description', 'Plan: ' || p_plan_id
    );
END;
$$;

CREATE OR REPLACE FUNCTION create_stripe_session(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 30,
    p_duration_unit TEXT DEFAULT 'days'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_public_key TEXT;
    v_transaction_id UUID;
BEGIN
    SELECT value INTO v_config FROM system_settings WHERE key = 'payment_gateways';
    v_public_key := v_config->'stripe'->>'public_key';

    IF v_public_key IS NULL OR v_public_key = '' THEN
        RETURN jsonb_build_object('error', 'Stripe not configured');
    END IF;

    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id, duration_value, duration_unit)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'stripe', p_plan_id, p_coupon_id, p_duration_value, p_duration_unit)
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'public_key', v_public_key,
        'amount', (p_amount * 100)::INTEGER,
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'plan_id', p_plan_id
    );
END;
$$;

CREATE OR REPLACE FUNCTION create_paypal_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 30,
    p_duration_unit TEXT DEFAULT 'days'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_client_id TEXT;
    v_transaction_id UUID;
BEGIN
    SELECT value INTO v_config FROM system_settings WHERE key = 'payment_gateways';
    v_client_id := v_config->'paypal'->>'client_id';

    IF v_client_id IS NULL OR v_client_id = '' THEN
        RETURN jsonb_build_object('error', 'PayPal not configured');
    END IF;

    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id, duration_value, duration_unit)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'paypal', p_plan_id, p_coupon_id, p_duration_value, p_duration_unit)
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'client_id', v_client_id,
        'amount', p_amount,
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'plan_id', p_plan_id
    );
END;
$$;

CREATE OR REPLACE FUNCTION create_ls_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 30,
    p_duration_unit TEXT DEFAULT 'days'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_store_id TEXT;
    v_transaction_id UUID;
BEGIN
    SELECT value INTO v_config FROM system_settings WHERE key = 'payment_gateways';
    v_store_id := v_config->'lemonsqueezy'->>'store_id';

    IF v_store_id IS NULL OR v_store_id = '' THEN
        RETURN jsonb_build_object('error', 'Lemon Squeezy not configured');
    END IF;

    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id, duration_value, duration_unit)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'lemonsqueezy', p_plan_id, p_coupon_id, p_duration_value, p_duration_unit)
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'store_id', v_store_id,
        'amount', p_amount,
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'plan_id', p_plan_id
    );
END;
$$;

-- Final Robust verify_payment RPC with Subscription Extension
CREATE OR REPLACE FUNCTION verify_payment(
    p_transaction_id UUID,
    p_provider_transaction_id TEXT,
    p_provider_status TEXT DEFAULT 'completed'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_txn RECORD;
    v_old_expiry TIMESTAMPTZ;
    v_expiry_date TIMESTAMPTZ;
    v_tier TEXT;
BEGIN
    -- 1. Get transaction and ensure it's pending
    SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'pending';
    
    IF NOT FOUND THEN
        -- Check if it was already completed (idempotency)
        SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'completed';
        IF FOUND THEN
            RETURN jsonb_build_object(
                'success', true, 
                'plan', v_txn.plan_id,
                'message', 'Transaction already processed'
            );
        END IF;
        RETURN jsonb_build_object('success', false, 'error', 'Transaction not found or already processed');
    END IF;

    -- 2. Map plan to tier (Updated for consistency)
    CASE v_txn.plan_id
        WHEN 'global' THEN v_tier := 'global';
        WHEN 'elite' THEN v_tier := 'global';
        WHEN 'pro' THEN v_tier := 'pro';
        WHEN 'explorer' THEN v_tier := 'pro';
        ELSE v_tier := 'pro'; -- Default to pro if unknown paid plan
    END CASE;

    -- 3. Get existing expiry to support extension
    SELECT subscription_expiry_date INTO v_old_expiry FROM profiles WHERE id = v_txn.user_id;

    -- 4. Calculate Expiry: Extend if already active, otherwise start from now
    IF v_old_expiry IS NOT NULL AND v_old_expiry > now() THEN
        v_expiry_date := v_old_expiry + (COALESCE(v_txn.duration_value, 30) || ' ' || COALESCE(v_txn.duration_unit, 'days'))::INTERVAL;
    ELSE
        v_expiry_date := now() + (COALESCE(v_txn.duration_value, 30) || ' ' || COALESCE(v_txn.duration_unit, 'days'))::INTERVAL;
    END IF;

    -- 5. Update transaction
    UPDATE transactions 
    SET 
        status = 'completed',
        provider_transaction_id = p_provider_transaction_id,
        provider_status = p_provider_status,
        updated_at = now()
    WHERE id = p_transaction_id;

    -- 6. Update user profile
    UPDATE profiles
    SET 
        selected_plan = v_txn.plan_id,
        subscription_tier = v_tier,
        subscription_expiry_date = v_expiry_date,
        updated_at = now()
    WHERE id = v_txn.user_id;

    RETURN jsonb_build_object(
        'success', true, 
        'plan', v_txn.plan_id,
        'tier', v_tier,
        'expiry_date', v_expiry_date
    );
END;
$$;
