-- 1. Speaking Queue (for matchmaking)
create table if not exists public.speaking_queue (
    user_id uuid references auth.users(id) primary key,
    exam_id text not null,
    created_at timestamptz default now()
);

alter table public.speaking_queue enable row level security;

create policy "Users can join queue"
    on public.speaking_queue for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can leave queue"
    on public.speaking_queue for delete
    to authenticated
    using (auth.uid() = user_id);

create policy "Anyone can view queue (for matching)"
    on public.speaking_queue for select
    to authenticated
    using (true);

-- 2. Speaking Sessions
create table if not exists public.speaking_sessions (
    id uuid default gen_random_uuid() primary key,
    interviewer_id uuid references auth.users(id),
    candidate_id uuid references auth.users(id),
    status text default 'active' check (status in ('active', 'completed', 'cancelled')),
    current_part int default 1,
    started_at timestamptz default now(),
    ended_at timestamptz
);

alter table public.speaking_sessions enable row level security;

create policy "Participants can view their sessions"
    on public.speaking_sessions for select
    to authenticated
    using (auth.uid() = interviewer_id or auth.uid() = candidate_id);

create policy "Participants can update their sessions"
    on public.speaking_sessions for update
    to authenticated
    using (auth.uid() = interviewer_id or auth.uid() = candidate_id);

create policy "Anyone can insert session (matchmaker)"
    on public.speaking_sessions for insert
    to authenticated
    with check (true);

-- 3. Speaking Scores
create table if not exists public.speaking_scores (
    id uuid default gen_random_uuid() primary key,
    session_id uuid references public.speaking_sessions(id) on delete cascade,
    scorer_id uuid references auth.users(id),
    candidate_id uuid references auth.users(id),
    fluency_score numeric check (fluency_score between 0 and 9),
    vocabulary_score numeric check (vocabulary_score between 0 and 9),
    grammar_score numeric check (grammar_score between 0 and 9),
    pronunciation_score numeric check (pronunciation_score between 0 and 9),
    comments text,
    created_at timestamptz default now()
);

alter table public.speaking_scores enable row level security;

create policy "Users can view scores for their sessions"
    on public.speaking_scores for select
    to authenticated
    using (
        exists (
            select 1 from public.speaking_sessions s
            where s.id = session_id
            and (s.interviewer_id = auth.uid() or s.candidate_id = auth.uid())
        )
    );

create policy "Interviewer can insert scores"
    on public.speaking_scores for insert
    to authenticated
    with check (auth.uid() = scorer_id);

-- 4. Enable Realtime for Signaling
-- We need to listen to 'speaking_sessions' (for new matches/status) and 'speaking_queue' (optional)
alter publication supabase_realtime add table public.speaking_sessions;
alter publication supabase_realtime add table public.speaking_queue;
