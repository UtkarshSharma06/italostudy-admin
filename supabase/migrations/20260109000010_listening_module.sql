-- 1. Listening Tests
create table if not exists public.listening_tests (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    created_at timestamptz default now()
);

alter table public.listening_tests enable row level security;
create policy "Public read listening tests" on public.listening_tests for select using (true);

-- 2. Listening Parts (4 parts per test)
create table if not exists public.listening_parts (
    id uuid default gen_random_uuid() primary key,
    test_id uuid references public.listening_tests(id) on delete cascade,
    title text not null,
    audio_url text not null, -- URL to Supabase Storage or external mp3
    transcript text, -- Optional transcript for review later
    order_index int default 1
);

alter table public.listening_parts enable row level security;
create policy "Public read listening parts" on public.listening_parts for select using (true);

-- 3. Listening Questions (Synced to Audio?)
create table if not exists public.listening_questions (
    id uuid default gen_random_uuid() primary key,
    part_id uuid references public.listening_parts(id) on delete cascade,
    question_type text check (question_type in ('mcq', 'bool', 'gap', 'map')), 
    question_text text not null,
    options jsonb,
    correct_answer text,
    order_index int default 1
);

alter table public.listening_questions enable row level security;
create policy "Public read listening questions" on public.listening_questions for select using (true);

-- 4. User Progress
create table if not exists public.listening_submissions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id),
    test_id uuid references public.listening_tests(id),
    score numeric,
    answers jsonb,
    created_at timestamptz default now()
);

alter table public.listening_submissions enable row level security;
create policy "Users manage listening subs" 
    on public.listening_submissions 
    for all 
    to authenticated 
    using (auth.uid() = user_id);
