-- Update handle_new_user function to capture name and avatar from Google metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      'Unknown User'
    ),
    COALESCE(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  );
  RETURN new;
END;
$$;

-- One-time fix for existing users with missing name/avatar
UPDATE public.profiles p
SET 
  display_name = COALESCE(
    u.raw_user_meta_data ->> 'display_name',
    u.raw_user_meta_data ->> 'full_name',
    u.raw_user_meta_data ->> 'name',
    p.display_name
  ),
  avatar_url = COALESCE(
    u.raw_user_meta_data ->> 'avatar_url',
    u.raw_user_meta_data ->> 'picture',
    p.avatar_url
  )
FROM auth.users u
WHERE p.id = u.id 
AND (p.display_name = 'Unknown' OR p.display_name IS NULL OR p.avatar_url IS NULL);
