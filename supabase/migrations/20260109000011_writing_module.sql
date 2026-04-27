-- 1. Writing Tasks (Prompts)
create table if not exists public.writing_tasks (
    id uuid default gen_random_uuid() primary key,
    task_type text check (task_type in ('task1', 'task2')), -- IELTS Task 1 (Report) or Task 2 (Essay)
    prompt text not null,
    min_words int default 150,
    created_at timestamptz default now()
);

alter table public.writing_tasks enable row level security;
create policy "Public read writing tasks" on public.writing_tasks for select using (true);

-- 2. User Submissions
create table if not exists public.writing_submissions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id),
    task_id uuid references public.writing_tasks(id),
    content text not null,
    word_count int,
    submitted_at timestamptz default now()
);

alter table public.writing_submissions enable row level security;
create policy "Users manage own writing subs" 
    on public.writing_submissions 
    for all 
    to authenticated 
    using (auth.uid() = user_id);

-- 3. AI Feedback (Optional: can use OpenRouter/Gemini on-demand instead of storing)
create table if not exists public.writing_feedback (
    id uuid default gen_random_uuid() primary key,
    submission_id uuid references public.writing_submissions(id) on delete cascade,
    overall_score numeric,
    task_achievement_score numeric,
    coherence_score numeric,
    lexical_score numeric,
    grammar_score numeric,
    feedback_text text,
    created_at timestamptz default now()
);

alter table public.writing_feedback enable row level security;
create policy "Users view own feedback" 
    on public.writing_feedback 
    for select 
    to authenticated 
    using (
        exists (
            select 1 from public.writing_submissions s
            where s.id = submission_id and s.user_id = auth.uid()
        )
    );
