-- Create a function to allow admins to delete users completely
-- This deletes from auth.users, which should cascade to all other tables (profiles, etc.) if keys are set up correctly.

CREATE OR REPLACE FUNCTION public.delete_user_by_admin(target_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role TEXT;
BEGIN
  -- Check if the executor is an admin
  SELECT role INTO current_user_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF current_user_role IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can delete users.';
  END IF;

  -- Perform the deletion from auth.users (requires specific permissions, usually postgres role or supa_admin, 
  -- but SECURITY DEFINER functions owned by postgres/service_role can do it if created via migration)
  -- However, direct delete from auth.users in a function might require granular permissions.
  -- In Supabase, the 'postgres' role (which runs migrations) has bypassrls.
  -- We need to ensure this function runs as a role with permission to delete from auth.users.
  -- Setting SECURITY DEFINER runs it as the owner (which is the migration runner/db owner).
  
  DELETE FROM auth.users WHERE id = target_user_id;
  
  -- Note: If this fails due to foreign key constraints not cascading, we might need to delete from profiles first.
  -- But usually auth.users is the parent. 
  -- If there are tables without ON DELETE CASCADE referencing auth.users, this will fail.
  -- We'll assume typical setup or let the error bubble up.
END;
$$;

-- Grant execute permission to authenticated users (the function itself checks for admin role)
GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(UUID) TO authenticated;
