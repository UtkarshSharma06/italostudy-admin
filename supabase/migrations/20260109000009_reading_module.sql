-- 1. Reading Tests Container
create table if not exists public.reading_tests (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    created_at timestamptz default now()
);

alter table public.reading_tests enable row level security;
create policy "Public read tests" on public.reading_tests for select using (true);

-- 2. Reading Passages (Usually 3 per test)
create table if not exists public.reading_passages (
    id uuid default gen_random_uuid() primary key,
    test_id uuid references public.reading_tests(id) on delete cascade,
    title text not null,
    content text not null, -- Markdown/HTML content of the passage
    order_index int default 1
);

alter table public.reading_passages enable row level security;
create policy "Public read passages" on public.reading_passages for select using (true);

-- 3. Reading Questions
create table if not exists public.reading_questions (
    id uuid default gen_random_uuid() primary key,
    passage_id uuid references public.reading_passages(id) on delete cascade,
    question_type text check (question_type in ('mcq', 'bool', 'gap')), -- bool=True/False/NotGiven
    question_text text not null,
    options jsonb, -- For MCQ: ["Option A", "Option B"]
    correct_answer text, -- For Gap: "answer", For MCQ: "Option A", For Bool: "TRUE"
    order_index int default 1
);

alter table public.reading_questions enable row level security;
create policy "Public read questions" on public.reading_questions for select using (true);

-- 4. User Progress/Answers (Optional but good for tracking)
create table if not exists public.reading_submissions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id),
    test_id uuid references public.reading_tests(id),
    score numeric,
    answers jsonb, -- { "q_id": "answer" }
    created_at timestamptz default now()
);

alter table public.reading_submissions enable row level security;
create policy "Users manage own submissions" 
    on public.reading_submissions 
    for all 
    to authenticated 
    using (auth.uid() = user_id);
