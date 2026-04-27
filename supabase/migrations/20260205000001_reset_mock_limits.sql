-- Reset mock exam attempts for all users
-- This allows everyone to start fresh with the new limit system
-- The restriction logic remains in place

-- Delete all mock tests
DELETE FROM tests WHERE is_mock = true;

-- Delete all mock exam submissions (if any exist)
DELETE FROM mock_exam_submissions;
