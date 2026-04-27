-- Add Protocol ID (email) to consultant access codes
ALTER TABLE public.consultant_access_codes ADD COLUMN IF NOT EXISTS protocol_id TEXT;
