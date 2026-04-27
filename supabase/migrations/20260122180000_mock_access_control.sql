-- Add access_type column to mock_sessions
ALTER TABLE "public"."mock_sessions" 
ADD COLUMN "access_type" text NOT NULL DEFAULT 'open';

-- Add check constraint to ensure valid values
ALTER TABLE "public"."mock_sessions"
ADD CONSTRAINT "mock_sessions_access_type_check"
CHECK (access_type IN ('open', 'request_required'));

-- Comment
COMMENT ON COLUMN "public"."mock_sessions"."access_type" IS 'Determines if the mock is open to all or requires approval. Values: open, request_required';
