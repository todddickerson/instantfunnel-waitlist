-- Create invites table
create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  email text,
  used_at timestamptz,
  created_at timestamptz default now()
);

-- Seed initial invite codes
insert into public.invites (code) values
  ('INSTANT2025'),
  ('FUNNELAI'),
  ('TODD2025'),
  ('EARLYBIRD'),
  ('IFLAUNCH')
on conflict (code) do nothing;

-- RLS: only service role can read/write
alter table public.invites enable row level security;
