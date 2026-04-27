-- Add subscription_expiry_date column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_expiry_date TIMESTAMP WITH TIME ZONE;

-- Update verify_payment RPC to handle expiry date
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
    v_billing_cycle TEXT;
    v_expiry_date TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Update transaction status and get details
    UPDATE transactions
    SET status = 'completed',
        provider_transaction_id = p_provider_transaction_id,
        metadata = p_metadata
    WHERE id = p_transaction_id AND user_id = auth.uid()
    RETURNING plan_id, user_id, (metadata->>'billing_cycle') INTO v_plan_id, v_user_id, v_billing_cycle;

    IF v_plan_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Transaction not found');
    END IF;

    -- Map plan to tier for backward compatibility
    CASE v_plan_id
        WHEN 'global' THEN v_tier := 'global';
        WHEN 'elite' THEN v_tier := 'global';
        WHEN 'pro' THEN v_tier := 'pro';
        ELSE v_tier := 'free';
    END CASE;

    -- Calculate expiry date
    -- Default to monthly if not specified
    IF v_billing_cycle = 'quarterly' THEN
        v_expiry_date := NOW() + INTERVAL '90 days';
    ELSE
        v_expiry_date := NOW() + INTERVAL '30 days';
    END IF;

    -- Update user's plan, subscription_tier, and expiry date
    UPDATE profiles
    SET selected_plan = v_plan_id,
        subscription_tier = v_tier,
        subscription_expiry_date = v_expiry_date
    WHERE id = v_user_id;

    RETURN jsonb_build_object(
        'success', true, 
        'plan', v_plan_id,
        'tier', v_tier,
        'expiry_date', v_expiry_date,
        'message', 'Plan updated successfully. Expires on ' || v_expiry_date::TEXT
    );
END;
$$;
