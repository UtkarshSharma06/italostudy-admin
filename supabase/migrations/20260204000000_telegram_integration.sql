-- Add Telegram integration fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS telegram_chat_id BIGINT UNIQUE,
ADD COLUMN IF NOT EXISTS telegram_verification_token TEXT UNIQUE;

-- Create index for faster token lookup during bot verification
CREATE INDEX IF NOT EXISTS idx_profiles_telegram_token 
ON public.profiles(telegram_verification_token);

-- Update RLS to allow users to see their own telegram info (already covered by existing policies)
-- But ensure telegram_verification_token is only visible to the user themselves
COMMENT ON COLUMN public.profiles.telegram_verification_token IS 'Secret token for Telegram bot linking. Should not be public.';
