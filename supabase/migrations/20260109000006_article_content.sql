-- Add support for Article content type
-- 1. Add content_type column with a check constraint (default to 'video' for existing)
-- 2. Add text_content column for storing HTML/Markdown articles

ALTER TABLE public.learning_content
ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'video' CHECK (content_type IN ('video', 'article')),
ADD COLUMN IF NOT EXISTS text_content TEXT;

-- Update existing records to be 'video' explicitly (though default handles it for future)
UPDATE public.learning_content SET content_type = 'video' WHERE content_type IS NULL;
