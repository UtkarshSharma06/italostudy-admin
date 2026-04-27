-- Add interview fields

-- 1. Add interview_link to profiles (for Consultants to store their personal meeting link)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interview_link TEXT;

-- 2. Add interview_scheduled_at to admission_applications (for specific appointment time)
ALTER TABLE admission_applications ADD COLUMN IF NOT EXISTS interview_scheduled_at TIMESTAMPTZ;

-- 3. Update status enum if needed (Assuming 'interview_scheduled' is just a string in the application status, 
-- but if we have a strict enum, we might need to alter it. 
-- Based on previous code, we just use text strings for status, so this is fine.)
