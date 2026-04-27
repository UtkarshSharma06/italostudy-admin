-- Create the storage bucket for learning assets
insert into storage.buckets (id, name, public)
values ('learning-assets', 'learning-assets', true)
on conflict (id) do nothing;

-- RLS is enabled by default on storage.objects, skipping ALTER TABLE to avoid permission errors


-- Policy: Allow ANYONE to download/view images (Public)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'learning-assets' );

-- Policy: Allow Authenticated users (Admins) to upload
create policy "Authenticated Upload"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'learning-assets' );

-- Policy: Allow Authenticated users to update/delete
create policy "Authenticated Update"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'learning-assets' );

create policy "Authenticated Delete"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'learning-assets' );
