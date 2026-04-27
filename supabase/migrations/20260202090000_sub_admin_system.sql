-- 1. Update profiles role constraint to include sub_admin
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin', 'consultant', 'sub_admin'));

-- 2. Create admin_permissions table
CREATE TABLE IF NOT EXISTS public.admin_permissions (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    allowed_tabs TEXT[] DEFAULT '{}',
    permissions JSONB DEFAULT '{
        "can_delete": false,
        "can_edit": true,
        "can_export": false
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;

-- 4. Policies for admin_permissions
-- Only super admins can manage permissions
-- Super admins are identified by specific emails or potentially a special flag
-- For now, we use the same logic as AdminRoute.tsx or check for 'admin' role

CREATE POLICY "Super admins can manage permissions" ON public.admin_permissions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Users can view their own permissions" ON public.admin_permissions
    FOR SELECT
    USING (auth.uid() = user_id);

-- 5. Trigger for updated_at
CREATE TRIGGER update_admin_permissions_updated_at
    BEFORE UPDATE ON public.admin_permissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
