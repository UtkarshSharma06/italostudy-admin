-- Link admission_applications to public.profiles specifically to enable Supabase join syntax
ALTER TABLE public.admission_applications
DROP CONSTRAINT IF EXISTS admission_applications_user_id_fkey,
ADD CONSTRAINT admission_applications_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Also update consultant_id if needed, but profiles are usually what we want to join
ALTER TABLE public.admission_applications
DROP CONSTRAINT IF EXISTS admission_applications_consultant_id_fkey,
ADD CONSTRAINT admission_applications_consultant_id_fkey 
    FOREIGN KEY (consultant_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
