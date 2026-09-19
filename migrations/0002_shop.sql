create table if not exists orders (
  id text primary key,
  user_id text,
  email text not null,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  last4 text not null,
  brand text not null,
  subtotal integer not null,
  shipping integer not null,
  tax integer not null,
  total integer not null,
  lines_json text not null,
  created_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists orders_created_at_idx on orders (created_at desc);

create table if not exists extra_products (
  id serial primary key,
  kind text not null,
  slug text not null unique,
  early boolean not null default false,
  payload text not null,
  created_at timestamptz not null default now()
);

create table if not exists hidden_products (
  slug text primary key
);

create table if not exists offers (
  id serial primary key,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists drop_notes (
  id serial primary key,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists admin_sessions (
  token text primary key,
  created_at timestamptz not null default now()
);

insert into offers (title, body)
select 'Member first look', 'New cuts hit the roster for members before the floor. Check the dashboard when a drop lands.'
where not exists (select 1 from offers);

insert into offers (title, body)
select 'Barn price', 'Members take 10% off merch at checkout — ask the desk, it is on the bag as Member barn.'
where not exists (select 1 from offers where title = 'Barn price');

insert into drop_notes (title, body)
select 'Next iron', 'The next cut is named on the member desk first. Public shop follows.'
where not exists (select 1 from drop_notes);
