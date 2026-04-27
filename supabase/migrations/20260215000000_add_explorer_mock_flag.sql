-- Add is_explorer_allowed column to mock_sessions table
-- This allows admins to designate which mock session Explorer users can attempt

-- Add the column
ALTER TABLE mock_sessions 
ADD COLUMN is_explorer_allowed BOOLEAN DEFAULT FALSE;

-- Create a function to ensure only one session can be explorer-allowed at a time
CREATE OR REPLACE FUNCTION ensure_single_explorer_mock()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting a session to explorer-allowed, unmark all others
  IF NEW.is_explorer_allowed = TRUE THEN
    UPDATE mock_sessions 
    SET is_explorer_allowed = FALSE 
    WHERE id != NEW.id AND is_explorer_allowed = TRUE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce the constraint
DROP TRIGGER IF EXISTS enforce_single_explorer_mock ON mock_sessions;
CREATE TRIGGER enforce_single_explorer_mock
  BEFORE INSERT OR UPDATE ON mock_sessions
  FOR EACH ROW
  WHEN (NEW.is_explorer_allowed = TRUE)
  EXECUTE FUNCTION ensure_single_explorer_mock();

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_mock_sessions_explorer_allowed 
ON mock_sessions(is_explorer_allowed) 
WHERE is_explorer_allowed = TRUE;

-- Add comment for documentation
COMMENT ON COLUMN mock_sessions.is_explorer_allowed IS 'Designates which mock session Explorer (free) users can attempt. Only one session can be marked as true at a time.';
