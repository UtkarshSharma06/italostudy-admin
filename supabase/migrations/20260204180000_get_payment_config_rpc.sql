-- Secure RPC to fetch payment config without exposing secret keys
-- Date: 2026-02-04

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
    )
  );
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION get_payment_config() TO authenticated;
GRANT EXECUTE ON FUNCTION get_payment_config() TO anon;
