-- Migration: Add subscription expiry check to limit RPCs
-- Date: 2026-05-14
-- Fix: check_practice_limit and check_mock_limit were not checking
--      subscription_expiry_date, so expired users still got unlimited
--      access until the cron job ran to downgrade them.

-- ─── 1. Fix check_practice_limit ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.check_practice_limit(user_uuid UUID)
RETURNS JSON
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan       TEXT;
  expiry_date     TIMESTAMPTZ;
  is_active       BOOLEAN;
  today_count     INTEGER;
  daily_limit     INTEGER;
BEGIN
  -- Get user's plan AND expiry in one query
  SELECT
    LOWER(COALESCE(selected_plan, 'explorer')),
    subscription_expiry_date
  INTO user_plan, expiry_date
  FROM profiles WHERE id = user_uuid;

  -- If subscription has expired → treat as explorer regardless of plan
  is_active := (expiry_date IS NULL OR expiry_date > NOW());
  IF NOT is_active AND user_plan NOT IN ('explorer') THEN
    user_plan := 'explorer';
  END IF;

  -- Set limits based on (possibly downgraded) plan
  daily_limit := CASE
    WHEN user_plan IN ('global', 'elite', 'pro', 'global admission plan') THEN 999999
    ELSE 15
  END;

  -- Count today's practice questions
  SELECT COUNT(*)::INTEGER INTO today_count
  FROM user_practice_responses
  WHERE user_id = user_uuid
    AND created_at::DATE = CURRENT_DATE;

  RETURN json_build_object(
    'allowed',    today_count < daily_limit,
    'remaining',  GREATEST(0, daily_limit - today_count),
    'limit',      daily_limit,
    'used',       today_count,
    'plan',       user_plan,
    'is_active',  is_active
  );
END;
$$ LANGUAGE plpgsql;

-- ─── 2. Fix check_mock_limit ──────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.check_mock_limit(user_uuid UUID)
RETURNS JSON
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan       TEXT;
  expiry_date     TIMESTAMPTZ;
  is_active       BOOLEAN;
  month_count     INTEGER;
  monthly_limit   INTEGER;
BEGIN
  -- Get user's plan AND expiry in one query
  SELECT
    LOWER(COALESCE(selected_plan, 'explorer')),
    subscription_expiry_date
  INTO user_plan, expiry_date
  FROM profiles WHERE id = user_uuid;

  -- If subscription has expired → treat as explorer regardless of plan
  is_active := (expiry_date IS NULL OR expiry_date > NOW());
  IF NOT is_active AND user_plan NOT IN ('explorer') THEN
    user_plan := 'explorer';
  END IF;

  -- Set limits based on (possibly downgraded) plan
  monthly_limit := CASE
    WHEN user_plan IN ('global', 'elite', 'global admission plan') THEN 999999
    ELSE 1
  END;

  -- Count this month's mock attempts
  SELECT COUNT(*)::INTEGER INTO month_count
  FROM tests
  WHERE user_id = user_uuid
    AND (is_mock = TRUE OR test_type = 'mock')
    AND created_at >= DATE_TRUNC('month', CURRENT_DATE);

  RETURN json_build_object(
    'allowed',    month_count < monthly_limit,
    'remaining',  GREATEST(0, monthly_limit - month_count),
    'limit',      monthly_limit,
    'used',       month_count,
    'plan',       user_plan,
    'is_active',  is_active
  );
END;
$$ LANGUAGE plpgsql;

-- ─── 3. Re-grant permissions ──────────────────────────────────────────────────

GRANT EXECUTE ON FUNCTION public.check_practice_limit(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_mock_limit(UUID) TO authenticated;

-- ─── 4. Verify (run these to confirm) ────────────────────────────────────────
-- SELECT public.check_practice_limit(auth.uid());
-- SELECT public.check_mock_limit(auth.uid());
