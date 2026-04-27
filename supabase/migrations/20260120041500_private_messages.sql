-- Add recipient_id to community_messages for private/system messages
ALTER TABLE community_messages ADD COLUMN IF NOT EXISTS recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE;

-- Update RLS for community_messages to handle private messages
-- Existing policy usually allows all members to see all messages in the community.
-- We need to modify it to: (recipient_id IS NULL OR recipient_id = auth.uid())

DROP POLICY IF EXISTS "Members can view community messages" ON community_messages;
CREATE POLICY "Members can view community messages" ON community_messages
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM community_members
        WHERE community_id = community_messages.community_id
        AND user_id = auth.uid()
        AND (status = 'approved' OR status = 'member')
    )
    AND (recipient_id IS NULL OR recipient_id = auth.uid())
);

-- Update Insert policy to allow setting recipient_id
DROP POLICY IF EXISTS "Members can insert messages" ON community_messages;
CREATE POLICY "Members can insert messages" ON community_messages
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM community_members
        WHERE community_id = community_messages.community_id
        AND user_id = auth.uid()
        AND (status = 'approved' OR status = 'member')
    )
);
