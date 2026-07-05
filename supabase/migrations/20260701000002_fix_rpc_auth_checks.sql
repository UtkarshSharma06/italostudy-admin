-- Prevent unauthenticated users from creating "ghost" transactions

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

    -- Create local transaction record
    INSERT INTO transactions (
        user_id, 
        amount, 
        currency, 
        status, 
        payment_method, 
        plan_id, 
        coupon_id,
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

CREATE OR REPLACE FUNCTION create_razorpay_order(
    p_amount INT,
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
    v_transaction_id UUID;
    v_uid UUID := auth.uid();
BEGIN
    IF v_uid IS NULL THEN
        RETURN jsonb_build_object('error', 'You must be logged in to make a purchase.');
    END IF;

    INSERT INTO transactions (
        user_id, amount, currency, status, payment_method, plan_id, coupon_id, metadata
    )
    VALUES (
        v_uid, p_amount / 100.0, p_currency, 'pending', 'razorpay', p_plan_id, p_coupon_id,
        jsonb_build_object('duration_value', p_duration_value, 'duration_unit', p_duration_unit)
    )
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object('transaction_id', v_transaction_id, 'success', true);
END;
$$;

CREATE OR REPLACE FUNCTION create_paddle_transaction(
    p_plan_id TEXT,
    p_amount NUMERIC,
    p_currency TEXT,
    p_coupon_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_transaction_id UUID;
    v_uid UUID := auth.uid();
BEGIN
    IF v_uid IS NULL THEN
        RETURN jsonb_build_object('error', 'You must be logged in to make a purchase.');
    END IF;

    INSERT INTO transactions (
        user_id, amount, currency, status, payment_method, plan_id, coupon_id
    )
    VALUES (
        v_uid, p_amount, p_currency, 'pending', 'paddle', p_plan_id, p_coupon_id
    )
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object('transaction_id', v_transaction_id, 'success', true);
END;
$$;
