-- Enable RLS on session_registrations if not already unique
alter table "public"."session_registrations" enable row level security;

-- Policy for Admins to view all registrations
create policy "Admins can view all session registrations"
on "public"."session_registrations"
for select
to authenticated
using (
  auth.uid() in (
    select id from profiles where role = 'admin'
  )
);

-- Note: Existing policies might only allow users to see their own. 
-- This new policy adds admin visibility.
