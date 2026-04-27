-- MEGA FIX: Payment Schema & Geolocation Logic
-- Date: 2026-02-05

-- 1. Ensure all required columns exist in transactions table
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS provider_status TEXT,
ADD COLUMN IF NOT EXISTS provider_transaction_id TEXT,
ADD COLUMN IF NOT EXISTS duration_value INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS duration_unit TEXT DEFAULT 'months' CHECK (duration_unit IN ('days', 'months', 'years')),
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::JSONB,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 2. Drop all conflicting/overloaded versions of verify_payment
DROP FUNCTION IF EXISTS public.verify_payment(uuid, text, jsonb);
DROP FUNCTION IF EXISTS public.verify_payment(uuid, text, text);

-- 3. Create the FINAL ROBUST verify_payment RPC
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
BEGIN
    -- Get transaction and ensure it's pending
    SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'pending';
    
    IF NOT FOUND THEN
        -- Idempotency check: if already completed, just return success
        SELECT * INTO v_txn FROM transactions WHERE id = p_transaction_id AND status = 'completed';
        IF FOUND THEN
            RETURN jsonb_build_object(
                'success', true, 
                'plan', v_txn.plan_id,
                'message', 'Transaction already processed'
            );
        END IF;
        RETURN jsonb_build_object('success', false, 'error', 'Transaction not found or already processed');
    END IF;

    -- Map plan to tier for backward compatibility
    CASE v_txn.plan_id
        WHEN 'global' THEN v_tier := 'global';
        WHEN 'elite' THEN v_tier := 'global';
        WHEN 'pro' THEN v_tier := 'pro';
        WHEN 'explorer' THEN v_tier := 'initiate'; -- Fix: Explorer is free/entry tier
        ELSE v_tier := 'pro';
    END CASE;

    -- Handle Subscription Extension
    SELECT subscription_expiry_date INTO v_old_expiry FROM profiles WHERE id = v_txn.user_id;

    -- Local variables for duration to allow for logic overrides
    v_dur_val := COALESCE(v_txn.duration_value, 1);
    v_dur_unit := COALESCE(v_txn.duration_unit, 'months');

    -- Improved Calculation logic: check if plan name implies daily
    IF v_txn.duration_unit IS NULL AND (v_txn.plan_id ILIKE '%day%' OR v_txn.plan_id ILIKE '%daily%') THEN
        v_dur_unit := 'days';
        v_dur_val := 1;
    END IF;

    IF v_old_expiry IS NOT NULL AND v_old_expiry > now() THEN
        v_expiry_date := v_old_expiry + (v_dur_val || ' ' || v_dur_unit)::INTERVAL;
    ELSE
        v_expiry_date := now() + (v_dur_val || ' ' || v_dur_unit)::INTERVAL;
    END IF;

    -- Update Transaction Record
    UPDATE transactions 
    SET 
        status = 'completed',
        provider_transaction_id = p_provider_transaction_id,
        provider_status = p_provider_status,
        updated_at = now()
    WHERE id = p_transaction_id;

    -- Update User Profile
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
        'extended', (v_old_expiry IS NOT NULL AND v_old_expiry > now())
    );
END;
$$;
