-- Clear any existing data (safe to re-run)
delete from portfolio_items;
delete from site_settings;
delete from contact_submissions;

-- Site settings (all editable from /admin/settings)
insert into site_settings (key, value) values
  ('owner_name',  'Sofia Reyes'),
  ('hero_label',  'Creative Portfolio'),
  ('tagline',     'Art Director & Visual Designer'),
  ('bio_short',   'I craft thoughtful visual identities and editorial experiences for brands that want to say something meaningful.'),
  ('bio_long',    'With over a decade spanning branding, editorial, and art direction, I help ambitious brands build visual languages that are both striking and deeply intentional. My work lives at the intersection of typography, composition, and storytelling — always rooted in a clear creative concept.'),
  ('email',       'hello@sofiareyes.co'),
  ('instagram',   'sofiareyes.studio'),
  ('behance',     'sofiareyes'),
  ('linkedin',    'in/sofiareyes'),
  ('twitter',     'sofiareyes_'),
  ('dribbble',    'sofiareyes');

-- Work portfolio items
insert into portfolio_items (title, description, section, asset_type, upload_url, thumbnail_url, tags, year, is_featured, status, sort_order) values
  (
    'Brand Identity — Studio A',
    'A full brand identity project including logo, typography, and color system for an architecture studio.',
    'work', 'upload',
    'https://picsum.photos/seed/brand-a/800/600',
    'https://picsum.photos/seed/brand-a/800/600',
    ARRAY['Branding', 'Identity'],
    2025, true, 'published', 0
  ),
  (
    'Icos — Editorial Campaign',
    'Editorial design for a lifestyle magazine spanning twelve-page spread with custom illustration.',
    'work', 'upload',
    'https://picsum.photos/seed/icos-ed/800/600',
    'https://picsum.photos/seed/icos-ed/800/600',
    ARRAY['Editorial'],
    2024, false, 'published', 1
  ),
  (
    'Annual Report 2024',
    'Corporate annual report — 52 pages of data visualization, infographics, and editorial layout.',
    'work', 'upload',
    'https://picsum.photos/seed/annual24/800/600',
    'https://picsum.photos/seed/annual24/800/600',
    ARRAY['Editorial', 'Print'],
    2024, false, 'published', 2
  ),
  (
    'Product Campaign — Bloom',
    'Photography and art direction for a skincare product launch across digital and print channels.',
    'work', 'upload',
    'https://picsum.photos/seed/bloom-camp/800/600',
    'https://picsum.photos/seed/bloom-camp/800/600',
    ARRAY['Photography', 'Campaign'],
    2024, false, 'published', 3
  ),
  (
    'Packaging — Verdant',
    'Sustainable packaging system for an organic skincare brand using kraft paper and soy inks.',
    'work', 'upload',
    'https://picsum.photos/seed/verdant-pkg/800/600',
    'https://picsum.photos/seed/verdant-pkg/800/600',
    ARRAY['Packaging', 'Print'],
    2023, false, 'published', 4
  );

-- Gallery items
insert into portfolio_items (title, description, section, asset_type, upload_url, thumbnail_url, tags, year, is_featured, status, sort_order) values
  (
    'Studio Shoot 01',
    'Portrait series from the spring studio session — natural light, minimal styling.',
    'gallery', 'upload',
    'https://picsum.photos/seed/studio01/800/1000',
    'https://picsum.photos/seed/studio01/800/1000',
    ARRAY['Photography'],
    2025, false, 'published', 0
  ),
  (
    'Architecture Study',
    'Urban architecture exploration — geometry, shadow, and texture across three cities.',
    'gallery', 'upload',
    'https://picsum.photos/seed/arch-study/800/600',
    'https://picsum.photos/seed/arch-study/800/600',
    ARRAY['Photography', 'Architecture'],
    2024, false, 'published', 1
  ),
  (
    'Type Experiments',
    'Typographic explorations and hand-lettering studies in gouache and ink.',
    'gallery', 'upload',
    'https://picsum.photos/seed/type-exp/600/800',
    'https://picsum.photos/seed/type-exp/600/800',
    ARRAY['Typography', 'Lettering'],
    2024, false, 'published', 2
  ),
  (
    'Still Life Series',
    'Slow photography — objects, texture, and quiet moments from the studio.',
    'gallery', 'upload',
    'https://picsum.photos/seed/stilllife/700/900',
    'https://picsum.photos/seed/stilllife/700/900',
    ARRAY['Photography'],
    2023, false, 'published', 3
  );
