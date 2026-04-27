-- Table for tracking active community calls
CREATE TABLE IF NOT EXISTS community_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    room_name TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ,
    
    CONSTRAINT active_call_per_community UNIQUE (community_id, is_active)
);

-- RLS for community_calls
ALTER TABLE community_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view calls" ON community_calls
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM community_members
            WHERE community_id = community_calls.community_id
            AND user_id = auth.uid()
            AND (status = 'approved' OR status = 'member')
        )
    );

CREATE POLICY "Members can start calls" ON community_calls
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM community_members
            WHERE community_id = community_calls.community_id
            AND user_id = auth.uid()
            AND (status = 'approved' OR status = 'member')
        )
    );

CREATE POLICY "Participants can end calls" ON community_calls
    FOR UPDATE USING (
        auth.uid() = created_by OR 
        EXISTS (
            SELECT 1 FROM community_members
            WHERE community_id = community_calls.community_id
            AND user_id = auth.uid()
            AND (status = 'approved' OR status = 'member')
        )
    ) WITH CHECK (
        is_active = false -- Only allow ending calls
    );

-- Helper to find active call
CREATE OR REPLACE VIEW active_community_calls AS
SELECT * FROM community_calls WHERE is_active = true;
