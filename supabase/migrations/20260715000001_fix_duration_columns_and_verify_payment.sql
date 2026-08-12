-- ============================================================
-- Fix: Restore duration_value/duration_unit columns in create_dodo_order
-- and create_razorpay_order RPCs. The 20260701000002 migration accidentally
-- dropped these columns from the INSERT, storing them only in metadata JSON.
-- This caused verify_payment RPC and webhooks to default to 1 month for
-- ALL durations (e.g. 3-month plan → 1 month).
-- ============================================================

-- 1. Fix create_dodo_order: write duration to BOTH columns AND metadata
CREATE OR REPLACE FUNCTION create_dodo_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INT DEFAULT 1,
    p_duration_unit TEXT DEFAULT 'months'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_config JSONB;
    v_transaction_id UUID;
    v_uid UUID := auth.uid();
BEGIN
    IF v_uid IS NULL THEN
        RETURN jsonb_build_object('error', 'You must be logged in to make a purchase.');
    END IF;

    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    IF v_config->'dodo'->>'enabled' IS NULL OR (v_config->'dodo'->>'enabled')::boolean = false THEN
        RETURN jsonb_build_object('error', 'Dodo Payments is not enabled');
    END IF;

    INSERT INTO transactions (
        user_id, 
        amount, 
        currency, 
        status, 
        payment_method, 
        plan_id, 
        coupon_id,
        duration_value,
        duration_unit,
        metadata
    )
    VALUES (
        v_uid, 
        p_amount, 
        p_currency, 
        'pending', 
        'dodo', 
        p_plan_id, 
        p_coupon_id,
        p_duration_value,
        p_duration_unit,
        jsonb_build_object(
            'duration_value', p_duration_value,
            'duration_unit', p_duration_unit
        )
    )
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'transaction_id', v_transaction_id,
        'success', true
    );
END;
$$;

-- 2. Fix create_razorpay_order: write duration to BOTH columns AND metadata
CREATE OR REPLACE FUNCTION create_razorpay_order(
    p_amount NUMERIC,
    p_currency TEXT,
    p_plan_id TEXT,
    p_coupon_id UUID DEFAULT NULL,
    p_duration_value INT DEFAULT 1,
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
    v_uid UUID := auth.uid();
BEGIN
    IF v_uid IS NULL THEN
        RETURN jsonb_build_object('error', 'You must be logged in to make a purchase.');
    END IF;

    SELECT value INTO v_config FROM system_settings WHERE key = 'payment_gateways';
    v_key_id := v_config->'razorpay'->>'key_id';

    IF v_key_id IS NULL OR v_key_id = '' THEN
        RETURN jsonb_build_object('error', 'Razorpay not configured');
    END IF;

    INSERT INTO transactions (
        user_id, amount, currency, status, payment_method, plan_id, coupon_id,
        duration_value, duration_unit, metadata
    )
    VALUES (
        v_uid, p_amount, p_currency, 'pending', 'razorpay', p_plan_id, p_coupon_id,
        p_duration_value, p_duration_unit,
        jsonb_build_object('duration_value', p_duration_value, 'duration_unit', p_duration_unit)
    )
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

-- 3. Also fix verify_payment to read from metadata as fallback
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
    v_dur_val INTEGER;
    v_dur_unit TEXT;
    v_already_completed BOOLEAN := FALSE;
BEGIN
    -- Step 1: try to find a pending transaction
    SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'pending';

    IF NOT FOUND THEN
        SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'completed';
        IF FOUND THEN
            v_already_completed := TRUE;
        ELSE
            RETURN jsonb_build_object('success', false, 'error', 'Transaction not found or already processed');
        END IF;
    END IF;

    -- Security check
    IF v_txn.user_id != auth.uid() THEN
        RETURN jsonb_build_object('success', false, 'error', 'Unauthorized');
    END IF;

    -- Map plan to tier
    CASE v_txn.plan_id
        WHEN 'global' THEN v_tier := 'global';
        WHEN 'elite'  THEN v_tier := 'global';
        WHEN 'pro'    THEN v_tier := 'pro';
        WHEN 'explorer' THEN v_tier := 'initiate';
        ELSE v_tier := 'pro';
    END CASE;

    -- Read duration from columns FIRST, then fallback to metadata
    v_dur_val  := COALESCE(
        v_txn.duration_value,
        (v_txn.metadata->>'duration_value')::INTEGER,
        1
    );
    v_dur_unit := COALESCE(
        v_txn.duration_unit,
        v_txn.metadata->>'duration_unit',
        'months'
    );

    -- Handle Subscription Extension
    SELECT subscription_expiry_date INTO v_old_expiry FROM profiles WHERE id = v_txn.user_id;

    IF v_old_expiry IS NOT NULL AND v_old_expiry > now() THEN
        v_expiry_date := v_old_expiry + (v_dur_val || ' ' || v_dur_unit)::INTERVAL;
    ELSE
        v_expiry_date := now() + (v_dur_val || ' ' || v_dur_unit)::INTERVAL;
    END IF;

    -- Mark transaction completed (idempotent)
    UPDATE transactions
    SET
        status = 'completed',
        provider_transaction_id = COALESCE(provider_transaction_id, p_provider_transaction_id),
        provider_status = p_provider_status,
        updated_at = now()
    WHERE id = p_transaction_id;

    -- ALWAYS update profile
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
        'expiry_date', v_expiry_date,
        'was_already_completed', v_already_completed
    );
END;
$$;
