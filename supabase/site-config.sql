-- ГРААЛЬ: persistent storage for the site constructor.
-- Run this SQL in Supabase SQL Editor before setting production env vars.

create table if not exists public.site_configs (
  key text primary key,
  config jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create index if not exists site_configs_updated_at_idx
  on public.site_configs (updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_configs_set_updated_at on public.site_configs;

create trigger site_configs_set_updated_at
before update on public.site_configs
for each row
execute function public.set_updated_at();

alter table public.site_configs enable row level security;

-- No public RLS policies are added intentionally.
-- The Next.js backend reads/writes with SUPABASE_SERVICE_ROLE_KEY only.
-- Never expose the service role key to the browser.
