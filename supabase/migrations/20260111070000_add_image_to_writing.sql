-- Add image_url to writing_tasks for Task 1 diagrams
alter table public.writing_tasks add column if not exists image_url text;
