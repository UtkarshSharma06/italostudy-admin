-- Add subscription_tier column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'global'));

-- Update existing users to 'pro' for the beta period (optional but good for existing beta users)
UPDATE public.profiles SET subscription_tier = 'pro' WHERE subscription_tier = 'free';

-- Update the handle_new_user function to automatically assign 'pro'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, subscription_tier)
  VALUES (
      new.id, 
      new.email, 
      new.raw_user_meta_data ->> 'display_name',
      'pro' -- AUTOMATIC PRO UPGRADE FOR BETA
  );
  RETURN new;
END;
$$;
