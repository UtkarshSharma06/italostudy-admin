-- Add media column to questions table
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- Add media column to practice_questions table
ALTER TABLE practice_questions 
ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- Add media column to session_questions table
ALTER TABLE session_questions 
ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_media ON questions USING GIN (media);
CREATE INDEX IF NOT EXISTS idx_practice_questions_media ON practice_questions USING GIN (media);
CREATE INDEX IF NOT EXISTS idx_session_questions_media ON session_questions USING GIN (media);
