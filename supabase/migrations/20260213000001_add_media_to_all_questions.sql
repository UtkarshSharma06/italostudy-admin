-- Add media column to reading_questions table
ALTER TABLE reading_questions 
ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- Add media column to listening_questions table
ALTER TABLE listening_questions 
ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- Add media column to writing_tasks table
ALTER TABLE writing_tasks 
ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reading_questions_media ON reading_questions USING GIN (media);
CREATE INDEX IF NOT EXISTS idx_listening_questions_media ON listening_questions USING GIN (media);
CREATE INDEX IF NOT EXISTS idx_writing_tasks_media ON writing_tasks USING GIN (media);
