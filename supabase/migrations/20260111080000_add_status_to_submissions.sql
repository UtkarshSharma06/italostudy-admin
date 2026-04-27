-- Add status column to submission tables
alter table public.reading_submissions add column if not exists status text default 'completed' check (status in ('in-progress', 'completed'));
alter table public.listening_submissions add column if not exists status text default 'completed' check (status in ('in-progress', 'completed'));
alter table public.writing_submissions add column if not exists status text default 'completed' check (status in ('in-progress', 'completed'));
