create table if not exists member_presence (
  user_id text primary key,
  last_seen timestamptz not null default now()
);
