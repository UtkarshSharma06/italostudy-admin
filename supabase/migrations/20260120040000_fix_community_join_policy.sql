-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can request to join" ON community_members;

-- New policy: Allow users to join communities
-- - For private communities: Insert with 'pending' status (request to join)
-- - For public communities: Insert with 'approved' status (instant join)
CREATE POLICY "Users can join communities" ON community_members
    FOR INSERT WITH CHECK (
        auth.uid() = user_id 
        AND (
            -- Allow pending requests for any community
            status = 'pending'
            -- Allow approved status ONLY if the community is NOT private
            OR (
                status = 'approved' 
                AND EXISTS (
                    SELECT 1 FROM communities 
                    WHERE id = community_members.community_id 
                    AND (is_private = false OR is_private IS NULL)
                )
            )
        )
    );
