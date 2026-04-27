-- Add pinned message and member count to communities
ALTER TABLE communities ADD COLUMN IF NOT EXISTS pinned_message_id UUID REFERENCES community_messages(id) ON DELETE SET NULL;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS member_count INTEGER DEFAULT 0;

-- Add is_pinned to community_members for per-user chat pinning
ALTER TABLE community_members ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;

-- Function to update member count
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF (NEW.status = 'approved' OR NEW.status = 'member') THEN
            UPDATE communities 
            SET member_count = member_count + 1 
            WHERE id = NEW.community_id;
        END IF;
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.status != 'approved' AND OLD.status != 'member' AND (NEW.status = 'approved' OR NEW.status = 'member')) THEN
            UPDATE communities 
            SET member_count = member_count + 1 
            WHERE id = NEW.community_id;
        ELSIF ((OLD.status = 'approved' OR OLD.status = 'member') AND NEW.status != 'approved' AND NEW.status != 'member') THEN
            UPDATE communities 
            SET member_count = member_count - 1 
            WHERE id = NEW.community_id;
        END IF;
    ELSIF (TG_OP = 'DELETE') THEN
        IF (OLD.status = 'approved' OR OLD.status = 'member') THEN
            UPDATE communities 
            SET member_count = member_count - 1 
            WHERE id = OLD.community_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for member count
DROP TRIGGER IF EXISTS tr_update_member_count ON community_members;
CREATE TRIGGER tr_update_member_count
AFTER INSERT OR UPDATE OR DELETE ON community_members
FOR EACH ROW EXECUTE FUNCTION update_community_member_count();

-- Function to auto-join General community
CREATE OR REPLACE FUNCTION auto_join_general_community()
RETURNS TRIGGER AS $$
DECLARE
    general_id UUID;
BEGIN
    -- Find or create General community
    SELECT id INTO general_id FROM communities WHERE name = 'General' LIMIT 1;
    
    IF general_id IS NULL THEN
        -- If it doesn't exist, we can't join, but usually it should be seeded
        -- For robust setup, we could create it here but better to pre-seed
        RETURN NEW;
    END IF;

    -- Insert member record
    INSERT INTO community_members (community_id, user_id, status)
    VALUES (general_id, NEW.id, 'approved')
    ON CONFLICT (community_id, user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for General auto-join when a profile is created
DROP TRIGGER IF EXISTS tr_auto_join_general ON profiles;
CREATE TRIGGER tr_auto_join_general
AFTER INSERT ON profiles
FOR EACH ROW EXECUTE FUNCTION auto_join_general_community();

-- Pre-seed "General" community if not exists
-- We use a dummy UUID if creator is not known, or just a placeholder
-- This might fail if created_by is NOT NULL and we don't have a user
-- Better to let the first admin create it or have it in seed.sql
-- For now, let's just make sure we handle it gracefully in the function.

-- Allow users to update their own pinning status
CREATE POLICY "Users can toggle pin on their membership" ON community_members
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow creators to pin messages
CREATE POLICY "Creators can pin messages" ON communities
    FOR UPDATE USING (created_by = auth.uid())
    WITH CHECK (created_by = auth.uid());
