CREATE OR REPLACE FUNCTION create_cashfree_order(
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
    v_environment TEXT;
    v_transaction_id UUID;
    v_user_id UUID;
BEGIN
    -- Get Cashfree config
    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    v_environment := COALESCE(v_config->'cashfree'->>'environment', 'sandbox');

    -- Get User Details
    v_user_id := auth.uid();

    -- Create transaction record
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
        v_user_id, 
        p_amount, 
        p_currency, 
        'pending', 
        'cashfree', 
        p_plan_id, 
        p_coupon_id,
        jsonb_build_object(
            'duration_value', p_duration_value,
            'duration_unit', p_duration_unit,
            'environment', v_environment
        )
    )
    RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object(
        'transaction_id', v_transaction_id,
        'environment', v_environment
    );
END;
$$;

GRANT EXECUTE ON FUNCTION create_cashfree_order TO authenticated;
