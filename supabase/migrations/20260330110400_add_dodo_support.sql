-- Migration: Add Dodo Payments Support
-- Date: 2026-03-30
-- 1. Update Transactions Payment Method Constraint
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_payment_method_check;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_payment_method_check 
CHECK (payment_method IN ('stripe', 'razorpay', 'paypal', 'lemonsqueezy', 'cashfree', 'paddle', 'dodo', 'beta', 'admin', 'manual'));

-- 2. Update get_payment_config RPC to include Dodo Payments
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
    ),
    'dodo', jsonb_build_object(
        'enabled', COALESCE((config->'dodo'->>'enabled')::boolean, false),
        'environment', COALESCE(config->'dodo'->>'environment', 'sandbox')
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION get_payment_config() TO authenticated;
GRANT EXECUTE ON FUNCTION get_payment_config() TO anon;

-- 3. Create Dodo Transaction RPC
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
BEGIN
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
        auth.uid(), 
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

GRANT EXECUTE ON FUNCTION create_dodo_order(NUMERIC, TEXT, TEXT, UUID, INT, TEXT) TO authenticated;
