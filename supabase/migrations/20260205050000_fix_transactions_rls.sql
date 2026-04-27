-- Fix transactions RLS to use the security definer function
-- Date: 2026-02-05

-- Drop existing admin policy on transactions
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.transactions;

-- Re-create using the check_is_admin() function to avoid RLS recursion/permission issues
CREATE POLICY "Admins can view all transactions"
ON public.transactions
FOR ALL
TO authenticated
USING (
  public.check_is_admin()
);

-- Ensure the function permission is granted (idempotent)
GRANT EXECUTE ON FUNCTION public.check_is_admin() TO authenticated;
