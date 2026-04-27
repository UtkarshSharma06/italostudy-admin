-- Migration: Update Payment Order RPCs to support dynamic durations
-- Date: 2026-02-05

-- 1. Razorpay
CREATE OR REPLACE FUNCTION create_razorpay_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 1,
    p_duration_unit TEXT DEFAULT 'months'
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

-- 2. Stripe
CREATE OR REPLACE FUNCTION create_stripe_session(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 1,
    p_duration_unit TEXT DEFAULT 'months'
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

-- 3. PayPal
CREATE OR REPLACE FUNCTION create_paypal_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 1,
    p_duration_unit TEXT DEFAULT 'months'
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

-- 4. Lemon Squeezy
CREATE OR REPLACE FUNCTION create_ls_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INTEGER DEFAULT 1,
    p_duration_unit TEXT DEFAULT 'months'
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
