-- Fix auto-join trigger to be name-independent
CREATE OR REPLACE FUNCTION auto_join_general_community()
RETURNS TRIGGER AS $$
DECLARE
    general_id UUID;
BEGIN
    -- Find the oldest community (the primary one)
    SELECT id INTO general_id 
    FROM communities 
    ORDER BY created_at ASC 
    LIMIT 1;
    
    IF general_id IS NULL THEN
        RETURN NEW;
    END IF;

    -- Insert member record
    INSERT INTO community_members (community_id, user_id, status)
    VALUES (general_id, NEW.id, 'approved')
    ON CONFLICT (community_id, user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
