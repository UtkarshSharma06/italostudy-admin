-- Add seats_count column to cent_exam_slots
ALTER TABLE IF EXISTS public.cent_exam_slots 
ADD COLUMN IF NOT EXISTS seats_count TEXT;

-- Ensure cent_slot_notifications has expected columns just in case
ALTER TABLE IF EXISTS public.cent_slot_notifications
ADD COLUMN IF NOT EXISTS previous_status TEXT,
ADD COLUMN IF NOT EXISTS new_status TEXT,
ADD COLUMN IF NOT EXISTS user_count INTEGER DEFAULT 0;
