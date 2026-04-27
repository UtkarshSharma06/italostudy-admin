-- Create a secure function to submit applications that bypasses RLS
CREATE OR REPLACE FUNCTION public.submit_consultant_application(
    p_full_name TEXT,
    p_email TEXT,
    p_qualifications TEXT,
    p_experience TEXT,
    p_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator (admin)
SET search_path = public
AS $$
DECLARE
    v_application_id UUID;
    v_existing_status TEXT;
BEGIN
    -- Check if user exists (basic validation)
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'User not found';
    END IF;

    -- Check for existing application
    SELECT status INTO v_existing_status
    FROM public.consultant_applications
    WHERE user_id = p_user_id;

    IF v_existing_status = 'pending' THEN
        RAISE EXCEPTION 'You already have a pending application.';
    ELSIF v_existing_status = 'approved' THEN
        RAISE EXCEPTION 'You are already an approved consultant.';
    END IF;

    -- Insert application
    INSERT INTO public.consultant_applications (
        user_id,
        full_name,
        email,
        qualifications,
        experience,
        status
    ) VALUES (
        p_user_id,
        p_full_name,
        p_email,
        p_qualifications,
        p_experience,
        'pending'
    )
    RETURNING id INTO v_application_id;

    RETURN jsonb_build_object('id', v_application_id, 'status', 'success');
END;
$$;
