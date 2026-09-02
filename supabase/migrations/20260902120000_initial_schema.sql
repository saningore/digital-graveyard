create table public.graves (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  name text not null check (char_length(name) between 2 and 100),
  github_url text not null,
  live_url text,
  description text not null check (char_length(description) between 20 and 1000),
  tech_stack text[] not null check (cardinality(tech_stack) between 1 and 8),
  stop_reason text,
  lessons_learned text,
  revivable boolean not null default false,
  screenshot_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.graves enable row level security;
create policy "Public can read graves" on public.graves for select using (true);
create policy "Users create their graves" on public.graves for insert with check (auth.uid() = owner_id);
create policy "Owners update their graves" on public.graves for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "Owners delete their graves" on public.graves for delete using (auth.uid() = owner_id);

insert into storage.buckets (id, name, public) values ('grave-screenshots', 'grave-screenshots', true);
create policy "Public can view grave screenshots" on storage.objects for select using (bucket_id = 'grave-screenshots');
create policy "Authenticated users upload their screenshots" on storage.objects for insert to authenticated with check (bucket_id = 'grave-screenshots' and (storage.foldername(name))[1] = auth.uid()::text);
