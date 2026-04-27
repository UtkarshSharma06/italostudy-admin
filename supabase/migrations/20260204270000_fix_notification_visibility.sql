-- Migration to fix site_notifications RLS visibility
-- Date: 2026-02-04

-- 1. Drop the existing permissive "Anyone can view active notifications" policy
DROP POLICY IF EXISTS "Anyone can view active notifications" ON public.site_notifications;

-- 2. Create a new policy that respects target_role and plan
CREATE POLICY "Users can view relevant active notifications" 
ON public.site_notifications FOR SELECT 
TO authenticated
USING (
    is_active = true AND (
        target_role IS NULL OR 
        target_role = 'all' OR 
        target_role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR
        (target_role = 'global' AND (
            SELECT (COALESCE(selected_plan, '') ILIKE '%global%') 
            FROM public.profiles 
            WHERE id = auth.uid()
        ))
    )
);

-- Note: The "Admins have full access to notifications" policy already exists from 
-- the create_site_notifications migration, which covers the 'admin' role correctly.
