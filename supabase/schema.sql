-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Enum types
create type section_type as enum ('work', 'gallery', 'about', 'contact');
create type asset_type as enum ('canva_embed', 'upload');
create type status_type as enum ('draft', 'published');

-- Main portfolio items table
create table portfolio_items (
  id             uuid primary key default uuid_generate_v4(),
  title          text not null,
  description    text,
  section        section_type not null default 'work',
  asset_type     asset_type not null default 'canva_embed',
  canva_embed_url text,
  canva_raw_url   text,
  upload_url     text,
  upload_path    text,
  thumbnail_url  text,
  tags           text[],
  year           integer,
  is_featured    boolean not null default false,
  status         status_type not null default 'draft',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Contact form submissions
create table contact_submissions (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

-- Site settings (bio, name, social links, etc.)
create table site_settings (
  key   text primary key,
  value text not null
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on portfolio_items
for each row execute function update_updated_at();

-- RLS Policies
alter table portfolio_items enable row level security;
alter table contact_submissions enable row level security;
alter table site_settings enable row level security;

-- Public can only read published items
create policy "Public read published"
  on portfolio_items for select
  using (status = 'published');

-- Authenticated admin can do everything
create policy "Admin full access"
  on portfolio_items for all
  using (auth.role() = 'authenticated');

create policy "Admin read contact submissions"
  on contact_submissions for select
  using (auth.role() = 'authenticated');

create policy "Anyone can submit contact"
  on contact_submissions for insert
  with check (true);

create policy "Admin manage settings"
  on site_settings for all
  using (auth.role() = 'authenticated');

create policy "Public read settings"
  on site_settings for select
  using (true);

-- Seed default site settings
insert into site_settings (key, value) values
  ('owner_name', 'Your Name'),
  ('tagline', 'Creative Designer & Visual Storyteller'),
  ('bio_short', 'A short bio that appears in the hero section.'),
  ('bio_long', 'A longer bio that appears on the About page.'),
  ('email', 'hello@yourname.com'),
  ('instagram', ''),
  ('behance', ''),
  ('linkedin', '');

-- Supabase Storage bucket
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true);

create policy "Public can view assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

create policy "Admin can upload assets"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Admin can delete assets"
  on storage.objects for delete
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');
