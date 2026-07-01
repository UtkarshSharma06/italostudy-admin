-- Fix: verify_payment must update profile even if webhook already marked tx as 'completed'
-- Root cause: webhook fires and marks transaction 'completed', then browser's verifyPayment()
-- finds status != 'pending' and skips the profile update, so user gets no plan.
-- Solution: always update the profile when the transaction belongs to the calling user.

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
        -- Not pending — check if it's already completed (webhook got there first)
        SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'completed';
        IF FOUND THEN
            v_already_completed := TRUE;
            -- STILL update the profile — the webhook may have set a wrong expiry
            -- or the profile update may have silently failed
        ELSE
            -- Transaction simply doesn't exist or is in a failed/cancelled state
            RETURN jsonb_build_object('success', false, 'error', 'Transaction not found or already processed');
        END IF;
    END IF;

    -- Security check: make sure this transaction belongs to the calling user
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

    -- Use the transaction's duration columns (populated by create_razorpay_order RPC)
    v_dur_val  := COALESCE(v_txn.duration_value, 1);
    v_dur_unit := COALESCE(v_txn.duration_unit, 'months');

    -- Handle Subscription Extension: if user has active plan, extend from current expiry
    SELECT subscription_expiry_date INTO v_old_expiry FROM profiles WHERE id = v_txn.user_id;

    IF v_old_expiry IS NOT NULL AND v_old_expiry > now() THEN
        v_expiry_date := v_old_expiry + (v_dur_val || ' ' || v_dur_unit)::INTERVAL;
    ELSE
        v_expiry_date := now() + (v_dur_val || ' ' || v_dur_unit)::INTERVAL;
    END IF;

    -- Mark transaction completed (idempotent — safe to run even if already completed)
    UPDATE transactions
    SET
        status = 'completed',
        provider_transaction_id = COALESCE(provider_transaction_id, p_provider_transaction_id),
        provider_status = p_provider_status,
        updated_at = now()
    WHERE id = p_transaction_id;

    -- ALWAYS update profile — this is the critical fix
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
