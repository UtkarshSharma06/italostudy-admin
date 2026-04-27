-- Add is_private to communities
ALTER TABLE communities ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false;

-- Create community_members table to track access
CREATE TABLE IF NOT EXISTS community_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'banned')),
    role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(community_id, user_id)
);

-- RLS for community_members
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own membership
CREATE POLICY "Users can view their own membership" ON community_members
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Community creators/admins can see all members of their communities
CREATE POLICY "Community admins can view all members" ON community_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM communities 
            WHERE id = community_members.community_id 
            AND created_by = auth.uid()
        )
        OR 
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Users can request to join (insert 'pending')
CREATE POLICY "Users can request to join" ON community_members
    FOR INSERT WITH CHECK (
        auth.uid() = user_id 
        AND status = 'pending'
    );
    -- Note: We might need to allow auto-approved insert for public communities if we decide to track them too,
    -- but for now, public communities might not need explicit membership to read? 
    -- User said "private communities... nobody can join automatically".
    -- Let's assume public communities don't enforce membership for reading, OR we make everyone auto-join public ones.
    -- For simplicity: Private = Check table. Public = Open.

-- Policy: Creators can update status (approve/reject)
CREATE POLICY "Creators can manage requests" ON community_members
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM communities 
            WHERE id = community_members.community_id 
            AND created_by = auth.uid()
        )
        OR 
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Enable Realtime for community_members to update sidebar counts
ALTER PUBLICATION supabase_realtime ADD TABLE community_members;
