-- RPC: Create Lemon Squeezy Order
-- Date: 2026-02-04

CREATE OR REPLACE FUNCTION create_ls_order(
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
    v_store_id TEXT;
    v_transaction_id UUID;
BEGIN
    -- Get Lemon Squeezy config
    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    v_store_id := v_config->'lemonsqueezy'->>'store_id';

    IF v_store_id IS NULL OR v_store_id = '' THEN
        RETURN jsonb_build_object('error', 'Lemon Squeezy not configured');
    END IF;

    -- Create transaction record
    INSERT INTO transactions (user_id, amount, currency, status, payment_method, plan_id, coupon_id)
    VALUES (auth.uid(), p_amount, p_currency, 'pending', 'lemonsqueezy', p_plan_id, p_coupon_id)
    RETURNING id INTO v_transaction_id;

    -- Return config for frontend
    RETURN jsonb_build_object(
        'store_id', v_store_id,
        'amount', p_amount,
        'currency', p_currency,
        'transaction_id', v_transaction_id,
        'plan_id', p_plan_id
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION create_ls_order TO authenticated;
