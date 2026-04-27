-- RPC: Create PayPal Order
-- Date: 2026-02-04

CREATE OR REPLACE FUNCTION create_paypal_order(
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
    v_client_id TEXT;
    v_transaction_id UUID;
BEGIN
    -- Get PayPal config
    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    v_client_id := v_config->'paypal'->>'client_id';

    IF v_client_id IS NULL OR v_client_id = '' THEN
        RETURN jsonb_build_object('error', 'PayPal not configured');
    END IF;

    -- Create transaction record
    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'paypal', p_plan_id, p_coupon_id)
    RETURNING id INTO v_transaction_id;

    -- Return config for frontend PayPal initialization
    RETURN jsonb_build_object(
        'client_id', v_client_id,
        'amount', p_amount,
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'plan_id', p_plan_id
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION create_paypal_order TO authenticated;
