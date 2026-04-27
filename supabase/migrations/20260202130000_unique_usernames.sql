-- Add username column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles (username);

-- Function to generate a unique username based on name/email
CREATE OR REPLACE FUNCTION public.generate_unique_username(base_name TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  final_username TEXT;
  counter INT := 0;
  suffix TEXT;
BEGIN
  -- Clean up the base name: lowercase, remove special chars, replace spaces with underscores
  final_username := lower(regexp_replace(base_name, '[^a-zA-Z0-9]', '', 'g'));
  
  -- If empty (e.g. funny layout), fallback to 'user'
  IF length(final_username) < 3 THEN
    final_username := 'user';
  END IF;

  -- Initial check
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) THEN
    RETURN final_username;
  END IF;

  -- Loop to find a unique name
  LOOP
    counter := counter + 1;
    -- Generate a suffix (random number to avoid sequential scanning bottlenecks)
    suffix := floor(random() * 9000 + 1000)::text; 
    
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username || '_' || suffix) THEN
      RETURN final_username || '_' || suffix;
    END IF;
    
    -- Safety break
    IF counter > 100 THEN
      RETURN final_username || '_' || floor(random() * 1000000)::text;
    END IF;
  END LOOP;
END;
$$;

-- Update the handle_new_user trigger function to include username generation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  generated_username TEXT;
BEGIN
  -- Generate username from metadata or email
  generated_username := public.generate_unique_username(
    COALESCE(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    )
  );

  INSERT INTO public.profiles (id, email, display_name, avatar_url, username)
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
    ),
    generated_username
  );
  RETURN new;
END;
$$;

-- RPC to update username
CREATE OR REPLACE FUNCTION public.update_username(new_username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Validation: Basic regex (alphanumeric + underscores, 3-20 chars)
  IF NOT new_username ~* '^[a-zA-Z0-9_]{3,20}$' THEN
    RAISE EXCEPTION 'Username must be 3-20 characters and contain only letters, numbers, or underscores.';
  END IF;

  -- Check availability
  IF EXISTS (SELECT 1 FROM public.profiles WHERE username = lower(new_username) AND id != auth.uid()) THEN
    RAISE EXCEPTION 'Username is already taken.';
  END IF;

  -- Update
  UPDATE public.profiles 
  SET username = lower(new_username), updated_at = now()
  WHERE id = auth.uid();

  RETURN TRUE;
END;
$$;

-- Backfill existing users (One-time op)
DO $$
DECLARE 
  r RECORD;
BEGIN
  FOR r IN SELECT id, email, display_name FROM public.profiles WHERE username IS NULL
  LOOP
    UPDATE public.profiles
    SET username = public.generate_unique_username(COALESCE(r.display_name, split_part(r.email, '@', 1)))
    WHERE id = r.id;
  END LOOP;
END $$;
