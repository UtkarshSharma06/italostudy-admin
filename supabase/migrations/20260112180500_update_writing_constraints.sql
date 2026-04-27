-- Update writing_submissions status check constraint to include 'pending'
alter table public.writing_submissions drop constraint if exists writing_submissions_status_check;
alter table public.writing_submissions add constraint writing_submissions_status_check check (status in ('in-progress', 'pending', 'completed'));

-- Also update reading and listening for consistency if needed, although they use auto-grading
alter table public.reading_submissions drop constraint if exists reading_submissions_status_check;
alter table public.reading_submissions add constraint reading_submissions_status_check check (status in ('in-progress', 'completed'));

alter table public.listening_submissions drop constraint if exists listening_submissions_status_check;
alter table public.listening_submissions add constraint listening_submissions_status_check check (status in ('in-progress', 'completed'));
