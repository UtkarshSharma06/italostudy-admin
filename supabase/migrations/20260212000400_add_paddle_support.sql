-- Migration: Add Paddle Support
-- Date: 2026-02-12

-- 1. Update Transactions Payment Method Constraint
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_payment_method_check;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_payment_method_check 
CHECK (payment_method IN ('stripe', 'razorpay', 'paypal', 'lemonsqueezy', 'cashfree', 'paddle'));

-- 2. Update get_payment_config RPC to include Paddle
CREATE OR REPLACE FUNCTION get_payment_config()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  config JSONB;
BEGIN
  -- Get the raw config
  SELECT value INTO config
  FROM system_settings
  WHERE key = 'payment_gateways';

  IF config IS NULL THEN
    RETURN '{}'::JSONB;
  END IF;

  -- Return securely filtered config
  RETURN jsonb_build_object(
    'stripe', jsonb_build_object(
        'enabled', COALESCE((config->'stripe'->>'enabled')::boolean, false),
        'public_key', COALESCE(config->'stripe'->>'public_key', '')
    ),
    'razorpay', jsonb_build_object(
        'enabled', COALESCE((config->'razorpay'->>'enabled')::boolean, false),
        'key_id', COALESCE(config->'razorpay'->>'key_id', '')
    ),
    'paypal', jsonb_build_object(
        'enabled', COALESCE((config->'paypal'->>'enabled')::boolean, false),
        'client_id', COALESCE(config->'paypal'->>'client_id', '')
    ),
    'lemonsqueezy', jsonb_build_object(
        'enabled', COALESCE((config->'lemonsqueezy'->>'enabled')::boolean, false),
        'store_id', COALESCE(config->'lemonsqueezy'->>'store_id', '')
    ),
    'cashfree', jsonb_build_object(
        'enabled', COALESCE((config->'cashfree'->>'enabled')::boolean, false),
        'app_id', COALESCE(config->'cashfree'->>'app_id', ''),
        'environment', COALESCE(config->'cashfree'->>'environment', 'sandbox')
    ),
    'paddle', jsonb_build_object(
        'enabled', COALESCE((config->'paddle'->>'enabled')::boolean, false),
        'vendor_id', COALESCE(config->'paddle'->>'vendor_id', ''),
        'client_token', COALESCE(config->'paddle'->>'client_token', ''),
        'environment', COALESCE(config->'paddle'->>'environment', 'sandbox')
    )
  );
END;
$$;

-- Grant permissions for get_payment_config
GRANT EXECUTE ON FUNCTION get_payment_config() TO authenticated;
GRANT EXECUTE ON FUNCTION get_payment_config() TO anon;

-- 3. Create Paddle Transaction RPC
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
    v_config JSONB;
    v_transaction_id UUID;
BEGIN
    -- Get Paddle config to check if enabled
    SELECT value INTO v_config
    FROM system_settings
    WHERE key = 'payment_gateways';

    IF v_config->'paddle'->>'enabled' IS NULL OR (v_config->'paddle'->>'enabled')::boolean = false THEN
        RETURN jsonb_build_object('error', 'Paddle is not enabled');
    END IF;

    -- Create local transaction record
    INSERT INTO transactions (
        user_id, 
        amount, 
        currency, 
        status, 
        payment_method, 
        plan_id, 
        coupon_id
    )
    VALUES (
        auth.uid(), 
        p_amount, 
        p_currency, 
        'pending', 
        'paddle', 
        p_plan_id, 
        p_coupon_id
    )
    RETURNING id INTO v_transaction_id;

    -- Return the local transaction ID
    -- Frontend will use this to call Paddle.Checkout.open()
    -- Note: If we had an Edge Function, we would call Paddle API here to get a 'txn_...' ID.
    -- For now, we return the local ID so the frontend can reference it.
    RETURN jsonb_build_object(
        'transaction_id', v_transaction_id,
        'success', true
    );
END;
$$;

-- Grant permissions for create_paddle_transaction
GRANT EXECUTE ON FUNCTION create_paddle_transaction(TEXT, NUMERIC, TEXT, UUID) TO authenticated;
