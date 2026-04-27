-- Migration: Fix Admin Subscription Block
-- Date: 2026-03-06
-- Purpose: Ensure admins bypass the subscription expiry check so they can view students.

CREATE OR REPLACE FUNCTION public.check_subscription_active(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  expiry_date TIMESTAMPTZ;
  user_role TEXT;
BEGIN
  -- Get both expiry and role
  SELECT subscription_expiry_date, role INTO expiry_date, user_role
  FROM profiles WHERE id = user_uuid;
  
  -- Admins ALWAYS have active access
  IF user_role = 'admin' THEN
    RETURN TRUE;
  END IF;

  -- NULL expiry = no expiration (lifetime or default)
  RETURN expiry_date IS NULL OR expiry_date > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.check_subscription_active IS 'Checks if user subscription is valid. Admins bypass expiry check.';
