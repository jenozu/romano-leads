-- Blue Horizon Pools MVP lead-ingestion schema.
-- Run this migration in the Supabase SQL editor or via the Supabase CLI.

create extension if not exists pgcrypto;

create sequence if not exists public.lead_number_seq start 1;

create or replace function public.next_lead_number()
returns text
language sql
security definer
set search_path = public
as $$
  select 'BH-' || lpad(nextval('public.lead_number_seq')::text, 6, '0');
$$;

revoke all on function public.next_lead_number() from public;
revoke all on function public.next_lead_number() from anon;
revoke all on function public.next_lead_number() from authenticated;
grant execute on function public.next_lead_number() to service_role;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_number text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  phone text not null,
  email text not null,
  city text not null,
  postal_code text not null,
  preferred_contact text,

  service_type text not null default 'pool-closing',
  timing text not null,
  pool_type text not null,
  cover_type text not null,
  pool_size text,
  notes text,

  photo_paths text[] not null default '{}',

  contact_consent boolean not null default false,
  consent_at timestamptz,

  lead_score text not null default 'UNSCORED',
  score_reason text,
  status text not null default 'NEW',

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_path text,
  referrer text,

  sent_to_romano_at timestamptz,
  contacted_at timestamptz,
  quoted_at timestamptz,
  booked_at timestamptz,
  completed_at timestamptz,
  quote_amount numeric(10,2),
  booked_revenue numeric(10,2),
  lost_reason text,

  constraint leads_service_type_check check (service_type = 'pool-closing'),
  constraint leads_timing_check check (timing in ('asap','within-7-days','1-2-weeks','2-4-weeks','researching')),
  constraint leads_pool_type_check check (pool_type in ('in-ground','above-ground','unsure')),
  constraint leads_cover_type_check check (cover_type in ('safety','tarp-winter','other','unsure')),
  constraint leads_preferred_contact_check check (preferred_contact is null or preferred_contact in ('phone','text','email')),
  constraint leads_status_check check (status in ('NEW','CONTACTED','QUOTED','BOOKED','COMPLETED','LOST')),
  constraint leads_score_check check (lead_score in ('UNSCORED','HOT','A','B','C','REJECTED')),
  constraint leads_consent_check check (contact_consent = true)
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_score_idx on public.leads (lead_score);
create index if not exists leads_utm_campaign_idx on public.leads (utm_campaign);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.leads enable row level security;

-- No anon/authenticated policies are intentionally created. The public form talks only
-- to the Astro server endpoint; the server uses the service-role key privately.
revoke all on table public.leads from anon;
revoke all on table public.leads from authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-photos',
  'lead-photos',
  false,
  8388608,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Keep the bucket private. No public storage policies are created. Server-side
-- service-role operations can upload/read files for later secure delivery to Romano.
