-- supabase/schema.sql
-- Run this entire file in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Settings table (one row per user — for now we store globally, no auth)
create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  openai_api_key text default '',
  gemini_api_key text default '',
  active_provider text default 'openai' check (active_provider in ('openai', 'gemini')),
  openai_model text default 'gpt-4o-mini',
  gemini_model text default 'gemini-2.0-flash',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Conversations (chat tabs)
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'New Chat',
  provider text not null check (provider in ('openai', 'gemini')),
  model text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  provider text not null,
  model text not null,
  tokens_input integer default 0,
  tokens_output integer default 0,
  cost_usd numeric(12, 8) default 0,
  created_at timestamptz default now()
);

-- 4. Cost records (one per API response — makes aggregation easy)
create table if not exists cost_records (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  provider text not null,
  model text not null,
  tokens_input integer not null default 0,
  tokens_output integer not null default 0,
  cost_usd numeric(12, 8) not null default 0,
  created_at timestamptz default now()
);

-- Indexes for fast cost queries
create index if not exists cost_records_provider_idx on cost_records(provider);
create index if not exists cost_records_created_at_idx on cost_records(created_at);
create index if not exists cost_records_conversation_idx on cost_records(conversation_id);
create index if not exists messages_conversation_idx on messages(conversation_id);

-- Helper view: per-conversation cost totals (use this in your useCosts hook)
create or replace view conversation_costs as
select
  c.id,
  c.title,
  c.provider,
  c.model,
  c.created_at,
  coalesce(sum(cr.cost_usd), 0) as total_cost_usd,
  count(distinct m.id) as message_count
from conversations c
left join cost_records cr on cr.conversation_id = c.id
left join messages m on m.conversation_id = c.id
group by c.id, c.title, c.provider, c.model, c.created_at;
