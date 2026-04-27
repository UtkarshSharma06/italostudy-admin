-- RPC: Validate Coupon
-- Date: 2026-02-04

CREATE OR REPLACE FUNCTION public.validate_coupon(code_input TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of creator (admin)
AS $$
DECLARE
    v_coupon RECORD;
    v_usage_count INT;
BEGIN
    -- convert input to uppercase
    code_input := upper(code_input);

    -- Find coupon
    SELECT * INTO v_coupon
    FROM public.coupons
    WHERE code = code_input
    AND is_active = true;

    -- Check if exists
    IF v_coupon IS NULL THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Invalid code');
    END IF;

    -- Check dates
    IF (v_coupon.valid_from IS NOT NULL AND now() < v_coupon.valid_from) OR
       (v_coupon.valid_until IS NOT NULL AND now() > v_coupon.valid_until) THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Coupon expired');
    END IF;

    -- Check usage limits
    IF v_coupon.max_uses IS NOT NULL AND v_coupon.used_count >= v_coupon.max_uses THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Usage limit reached');
    END IF;

    -- Return valid details
    RETURN jsonb_build_object(
        'valid', true,
        'id', v_coupon.id,
        'code', v_coupon.code,
        'discount_type', v_coupon.discount_type,
        'discount_value', v_coupon.discount_value
    );
END;
$$;
