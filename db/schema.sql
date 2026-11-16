-- PostgreSQL schema for moving LUXORA from the JSON file store to a real database.
-- All server access goes through src/lib/server/db.ts, so only that module needs re-implementing.
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null unique,
  password_hash text not null, role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now());
create table products (
  id text primary key, slug text not null unique, name text not null, category text not null,
  brand text, description text, price numeric(10,2) not null check (price > 0), old_price numeric(10,2),
  stock integer not null default 0 check (stock >= 0), sku text, image text, images text[] default '{}',
  rating numeric(2,1) default 0, review_count integer default 0,
  is_featured boolean default false, is_best_seller boolean default false, is_new_arrival boolean default false,
  created_at timestamptz default now(), updated_at timestamptz);
create index on products (category); create index on products (price);
create table coupons (
  code text primary key, type text not null check (type in ('percent','fixed')), value numeric(10,2) not null,
  min_subtotal numeric(10,2) default 0, active boolean default true, expires_at timestamptz,
  usage_limit integer, used integer not null default 0);
create sequence order_number_seq start 1001;
create table orders (
  id uuid primary key default gen_random_uuid(),
  number text not null unique default ('LX-' || nextval('order_number_seq')),
  user_id uuid references users(id), email text not null,
  shipping jsonb not null, subtotal numeric(10,2) not null, discount numeric(10,2) not null default 0,
  shipping_fee numeric(10,2) not null default 0, tax numeric(10,2) not null default 0, total numeric(10,2) not null,
  coupon_code text, payment_method text not null check (payment_method in ('cod','card')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed')),
  status text not null default 'placed' check (status in ('placed','confirmed','processing','shipped','delivered','cancelled')),
  idempotency_key text unique, created_at timestamptz not null default now());
create table order_items (
  id bigserial primary key, order_id uuid not null references orders(id) on delete cascade,
  product_id text not null, name text not null, image text, unit_price numeric(10,2) not null, quantity integer not null check (quantity > 0));
create table order_events (id bigserial primary key, order_id uuid references orders(id) on delete cascade, status text not null, at timestamptz default now());
create table reviews (
  id uuid primary key default gen_random_uuid(), product_id text references products(id) on delete cascade,
  user_id uuid references users(id), user_name text, rating smallint check (rating between 1 and 5),
  comment text, created_at timestamptz default now(), unique (product_id, user_id));
create table newsletter_subscribers (email text primary key, created_at timestamptz default now());
-- Stock deduction must happen in the same transaction as the order insert:
--   update products set stock = stock - $qty where id = $id and stock >= $qty;  -- 0 rows => out of stock
