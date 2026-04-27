-- Emergency fix: Upgrade user jnvamazon@gmail.com to Global plan
-- Payment confirmed from billing history (multiple GLOBAL PLAN - DODO transactions at €10)
-- Date: 2026-04-26

DO $$
DECLARE
    v_user_id UUID;
    v_expiry TIMESTAMPTZ;
BEGIN
    -- Find the user by email
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'jnvamazon@gmail.com';

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User not found: jnvamazon@gmail.com';
    END IF;

    -- Set expiry to 1 month from now (Global plan - monthly)
    v_expiry := now() + INTERVAL '1 month' + INTERVAL '2 days'; -- 2-day grace period

    -- Upgrade profile to Global plan
    UPDATE profiles SET
        selected_plan          = 'global',
        subscription_tier      = 'global',
        subscription_expiry_date = v_expiry,
        payment_provider       = 'dodo',
        updated_at             = now()
    WHERE id = v_user_id;

    -- Mark the most recent DODO transaction as completed (latest one)
    UPDATE transactions SET
        status = 'completed',
        updated_at = now()
    WHERE user_id = v_user_id
      AND payment_method = 'dodo'
      AND status = 'pending'
      AND created_at = (
          SELECT MAX(created_at) FROM transactions
          WHERE user_id = v_user_id AND payment_method = 'dodo'
      );

    RAISE NOTICE 'User % upgraded to Global plan. Expiry: %', v_user_id, v_expiry;
END;
$$;
