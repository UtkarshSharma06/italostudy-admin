-- Add cart column to profiles table to support persistent shopping bags
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS cart JSONB DEFAULT '[]'::jsonb;

-- Ensure users can update their own cart
DROP POLICY IF EXISTS "Users can update their own cart" ON public.profiles;
CREATE POLICY "Users can update their own cart" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- Comment for clarity
COMMENT ON COLUMN public.profiles.cart IS 'Stores the shopping cart items as a JSON array for cross-device persistence.';
