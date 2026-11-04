-- Vericove MVP foundation: account profiles and a public research catalogue.
-- User-owned data is protected with RLS. Profile/account type fields are not
-- used as authorization claims; verified permissions need a separate workflow.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Member'
    check (char_length(display_name) between 1 and 80),
  handle text
    check (handle is null or handle ~ '^[A-Za-z0-9_]{3,24}$'),
  bio text not null default ''
    check (char_length(bio) <= 500),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_handle_lower_unique
  on public.profiles (lower(handle))
  where handle is not null;

alter table public.profiles enable row level security;

grant select, insert, update on public.profiles to authenticated;

create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Users can create their own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create table public.research_sources (
  id uuid primary key default gen_random_uuid(),
  provider text not null
    check (provider in ('pubmed', 'pmc', 'who', 'cochrane', 'internal')),
  external_id text not null,
  doi text,
  title text not null check (char_length(title) between 1 and 1000),
  authors text[] not null default '{}',
  journal text,
  published_on date,
  study_type text,
  abstract text,
  source_url text not null,
  licence text,
  created_at timestamptz not null default now(),
  unique (provider, external_id)
);

create index research_sources_published_on_idx
  on public.research_sources (published_on desc);

create index research_sources_search_idx
  on public.research_sources using gin (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(abstract, ''))
  );

alter table public.research_sources enable row level security;

grant select on public.research_sources to anon, authenticated;

create policy "Research catalogue is readable"
  on public.research_sources for select to anon, authenticated
  using (true);

create table public.saved_research (
  user_id uuid not null references auth.users (id) on delete cascade,
  source_id uuid not null references public.research_sources (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, source_id)
);

create index saved_research_source_id_idx
  on public.saved_research (source_id);

alter table public.saved_research enable row level security;

grant select, insert, delete on public.saved_research to authenticated;

create policy "Users can read their saved research"
  on public.saved_research for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can save research for themselves"
  on public.saved_research for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can remove their own saved research"
  on public.saved_research for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Create the app profile whenever Supabase Auth creates an account.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), 'Member')
  );
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
