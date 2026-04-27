-- Create Payment Order RPC Functions
-- Date: 2026-02-04

-- Razorpay Order Creation
CREATE OR REPLACE FUNCTION create_razorpay_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_key_id TEXT;
    v_key_secret TEXT;
    v_order_id TEXT;
    v_transaction_id UUID;
BEGIN
    -- Get Razorpay config
    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    v_key_id := v_config->'razorpay'->>'key_id';
    v_key_secret := v_config->'razorpay'->>'key_secret';

    IF v_key_id IS NULL OR v_key_id = '' THEN
        RETURN jsonb_build_object('error', 'Razorpay not configured');
    END IF;

    -- Create transaction record
    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'razorpay', p_plan_id, p_coupon_id)
    RETURNING id INTO v_transaction_id;

    -- In production, you'd call Razorpay API here via http extension
    -- For now, return the config needed for frontend
    RETURN jsonb_build_object(
        'key_id', v_key_id,
        'amount', (p_amount * 100)::INTEGER, -- Razorpay uses paise
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'name', 'ItaloStudy',
        'description', 'Plan: ' || p_plan_id
    );
END;
$$;

-- Stripe Checkout Session
CREATE OR REPLACE FUNCTION create_stripe_session(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_public_key TEXT;
    v_secret_key TEXT;
    v_transaction_id UUID;
BEGIN
    -- Get Stripe config
    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    v_public_key := v_config->'stripe'->>'public_key';
    v_secret_key := v_config->'stripe'->>'secret_key';

    IF v_public_key IS NULL OR v_public_key = '' THEN
        RETURN jsonb_build_object('error', 'Stripe not configured');
    END IF;

    -- Create transaction record
    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'stripe', p_plan_id, p_coupon_id)
    RETURNING id INTO v_transaction_id;

    -- Return config for frontend Stripe initialization
    RETURN jsonb_build_object(
        'public_key', v_public_key,
        'amount', (p_amount * 100)::INTEGER, -- Stripe uses cents
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'plan_id', p_plan_id
    );
END;
$$;

-- Verify Payment (called after successful payment)
CREATE OR REPLACE FUNCTION verify_payment(
    p_transaction_id UUID,
    p_provider_transaction_id TEXT,
    p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_plan_id TEXT;
    v_user_id UUID;
    v_tier TEXT;
BEGIN
    -- Update transaction status and get details
    UPDATE transactions
    SET status = 'completed',
        provider_transaction_id = p_provider_transaction_id,
        metadata = p_metadata
    WHERE id = p_transaction_id AND user_id = auth.uid()
    RETURNING plan_id, user_id INTO v_plan_id, v_user_id;

    IF v_plan_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Transaction not found');
    END IF;

    -- Map plan to tier for backward compatibility
    -- global/elite -> global, pro -> pro, explorer -> free
    CASE v_plan_id
        WHEN 'global' THEN v_tier := 'global';
        WHEN 'elite' THEN v_tier := 'global';
        WHEN 'pro' THEN v_tier := 'pro';
        ELSE v_tier := 'free';
    END CASE;

    -- Update user's plan AND subscription_tier
    UPDATE profiles
    SET selected_plan = v_plan_id,
        subscription_tier = v_tier
    WHERE id = v_user_id;

    RETURN jsonb_build_object(
        'success', true, 
        'plan', v_plan_id,
        'tier', v_tier,
        'message', 'Plan updated successfully'
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION create_razorpay_order TO authenticated;
GRANT EXECUTE ON FUNCTION create_stripe_session TO authenticated;
GRANT EXECUTE ON FUNCTION verify_payment TO authenticated;
