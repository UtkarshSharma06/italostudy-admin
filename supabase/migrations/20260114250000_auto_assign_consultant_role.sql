-- 1. Ensure role column exists and defaults to 'user'
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'consultant'));
    END IF;
END $$;

-- 2. Update handle_new_user function to auto-assign consultant role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    is_expert_email BOOLEAN;
BEGIN
    -- Check if this email has an active (unused) consultant access code
    SELECT EXISTS (
        SELECT 1 FROM public.consultant_access_codes 
        WHERE protocol_id = new.email 
        AND is_used = false
    ) INTO is_expert_email;

    IF is_expert_email THEN
        INSERT INTO public.profiles (id, email, display_name, role)
        VALUES (new.id, new.email, new.raw_user_meta_data ->> 'display_name', 'consultant');
        
        -- Mark the code as used now that the profile is created
        -- Note: We can't easily track WHICH code if there are multiple, but we mark the most recent one
        UPDATE public.consultant_access_codes 
        SET is_used = true, used_by = new.id
        WHERE id = (
            SELECT id FROM public.consultant_access_codes 
            WHERE protocol_id = new.email 
            AND is_used = false 
            ORDER BY created_at DESC 
            LIMIT 1
        );
    ELSE
        INSERT INTO public.profiles (id, email, display_name, role)
        VALUES (new.id, new.email, new.raw_user_meta_data ->> 'display_name', 'user');
    END IF;

    RETURN new;
END;
$$;
