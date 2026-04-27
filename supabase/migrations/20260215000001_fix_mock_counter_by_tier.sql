-- Fix Mock Counter to Only Count Attempts Made on Current Plan
-- Problem: When user upgrades to Premium, attempts 7 mocks, then downgrades to Explorer,
-- the counter shows "7/1" because it counts ALL lifetime attempts.
-- Solution: Track subscription_tier on each test, only count same-tier attempts for limits.

-- Step 1: Add subscription_tier column to tests table
ALTER TABLE tests 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT;

-- Step 2: Add index for performance
CREATE INDEX IF NOT EXISTS idx_tests_user_tier_mock 
ON tests(user_id, subscription_tier, is_mock) 
WHERE is_mock = TRUE;

-- Step 3: Mark existing records as 'legacy' so they don't count against new limits
UPDATE tests 
SET subscription_tier = 'legacy' 
WHERE subscription_tier IS NULL AND is_mock = TRUE;

-- Step 4: Update the check_mock_limit RPC function
CREATE OR REPLACE FUNCTION public.check_mock_limit(user_uuid UUID)
RETURNS JSON 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan TEXT;
  user_tier TEXT;
  month_count INTEGER;
  monthly_limit INTEGER;
BEGIN
  -- Verify caller matches user_uuid (security check)
  IF auth.uid() != user_uuid THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Get user's plan and tier
  SELECT 
    LOWER(COALESCE(selected_plan, 'explorer')),
    LOWER(COALESCE(subscription_tier, 'explorer'))
  INTO user_plan, user_tier
  FROM profiles WHERE id = user_uuid;
  
  -- Set limits based on plan (mocks are Elite+ feature)
  monthly_limit := CASE
    WHEN user_plan IN ('global', 'elite', 'global admission plan') 
      OR user_tier IN ('elite', 'global') THEN 999999
    ELSE 1
  END;
  
  -- Count mock attempts based on current plan
  IF user_plan IN ('global', 'elite', 'global admission plan') OR user_tier IN ('elite', 'global') THEN
    -- Premium users: count all their attempts (unlimited anyway)
    SELECT COUNT(*)::INTEGER INTO month_count
    FROM tests
    WHERE user_id = user_uuid
      AND (is_mock = TRUE OR test_type = 'mock')
      AND created_at >= DATE_TRUNC('month', CURRENT_DATE);
  ELSE
    -- Explorer users: ONLY count attempts made while on 'explorer' tier
    -- This prevents counting previous premium attempts against their Explorer limit
    SELECT COUNT(*)::INTEGER INTO month_count
    FROM tests
    WHERE user_id = user_uuid
      AND (is_mock = TRUE OR test_type = 'mock')
      AND subscription_tier = 'explorer'
      AND created_at >= DATE_TRUNC('month', CURRENT_DATE);
  END IF;
  
  RETURN json_build_object(
    'allowed', month_count < monthly_limit,
    'remaining', GREATEST(0, monthly_limit - month_count),
    'limit', monthly_limit,
    'used', month_count,
    'plan', user_plan
  );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.check_mock_limit IS 'Secure RPC: Counts mock attempts by plan tier - Explorer users only count explorer-tier attempts';

-- Step 5: Create a trigger to auto-populate subscription_tier on new test inserts
CREATE OR REPLACE FUNCTION set_test_subscription_tier()
RETURNS TRIGGER AS $$
DECLARE
  user_tier TEXT;
BEGIN
  -- Get the user's current subscription tier
  SELECT LOWER(COALESCE(subscription_tier, selected_plan, 'explorer'))
  INTO user_tier
  FROM profiles
  WHERE id = NEW.user_id;
  
  -- Set the subscription_tier on the test record
  NEW.subscription_tier := user_tier;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trigger_set_test_subscription_tier ON tests;

-- Create the trigger
CREATE TRIGGER trigger_set_test_subscription_tier
  BEFORE INSERT ON tests
  FOR EACH ROW
  EXECUTE FUNCTION set_test_subscription_tier();

COMMENT ON TRIGGER trigger_set_test_subscription_tier ON tests IS 'Auto-populates subscription_tier from user profile on test creation';
