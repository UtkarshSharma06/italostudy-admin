-- Table to store CENT exam slots
CREATE TABLE IF NOT EXISTS public.cent_exam_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_date DATE NOT NULL,
    location TEXT NOT NULL, -- 'CENT@UNI' or 'CENT@CASA'
    university TEXT NOT NULL,
    region TEXT,
    city TEXT,
    registration_deadline DATE,
    seats_available BOOLEAN NOT NULL DEFAULT false,
    seats_status TEXT, -- 'POSTI DISPONIBILI', 'POSTI ESAURITI', etc.
    last_checked_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(test_date, location, university)
);

 -- Table to track slot changes for notifications
CREATE TABLE IF NOT EXISTS public.cent_slot_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID REFERENCES public.cent_exam_slots(id) ON DELETE CASCADE,
    previous_status TEXT,
    new_status TEXT,
    notified_at TIMESTAMPTZ DEFAULT NOW(),
    user_count INTEGER DEFAULT 0
);

-- Add tracking preferences to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS track_cent_uni BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS track_cent_casa BOOLEAN DEFAULT true;

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_cent_slots_available ON public.cent_exam_slots(seats_available, location);
CREATE INDEX IF NOT EXISTS idx_cent_slots_date ON public.cent_exam_slots(test_date);

-- Enable RLS
ALTER TABLE public.cent_exam_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cent_slot_notifications ENABLE ROW LEVEL SECURITY;

-- Policies for cent_exam_slots (viewable by authenticated users)
CREATE POLICY "Allow public read access to cent_exam_slots" ON public.cent_exam_slots
    FOR SELECT USING (true);

-- Policies for cent_slot_notifications (system only, but let's allow read for admins if needed)
CREATE POLICY "Allow authenticated full access to cent_slot_notifications" ON public.cent_slot_notifications
    FOR ALL USING (auth.role() = 'authenticated');
