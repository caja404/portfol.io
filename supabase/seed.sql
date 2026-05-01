-- Seed portfolio items
insert into portfolio_items (title, description, section, asset_type, canva_embed_url, canva_raw_url, thumbnail_url, tags, year, is_featured, status, sort_order) values
  (
    'Brand Identity — Studio A',
    'A full brand identity project including logo, typography, and color system.',
    'work', 'canva_embed',
    'https://www.canva.com/design/DAFplaceholder123/view?embed',
    'https://www.canva.com/design/DAFplaceholder123/view',
    null,
    ARRAY['Branding', 'Identity'],
    2024, true, 'published', 0
  ),
  (
    'Annual Report 2023',
    'Editorial design for a corporate annual report, 48 pages.',
    'work', 'canva_embed',
    'https://www.canva.com/design/DAFplaceholder123/view?embed',
    'https://www.canva.com/design/DAFplaceholder123/view',
    null,
    ARRAY['Editorial', 'Print'],
    2023, false, 'published', 1
  ),
  (
    'Product Campaign',
    'Photography and art direction for a consumer product launch.',
    'work', 'upload',
    null, null,
    'https://placehold.co/800x600',
    ARRAY['Photography', 'Campaign'],
    2024, false, 'published', 2
  ),
  (
    'Packaging Design',
    'Sustainable packaging design for an organic skincare brand.',
    'work', 'upload',
    null, null,
    'https://placehold.co/800x600',
    ARRAY['Packaging', 'Print'],
    2023, false, 'published', 3
  );

-- Gallery items
insert into portfolio_items (title, description, section, asset_type, upload_url, thumbnail_url, tags, year, is_featured, status, sort_order) values
  (
    'Studio Shoot 01',
    'Portrait series from the spring studio session.',
    'gallery', 'upload',
    'https://placehold.co/800x1000',
    'https://placehold.co/800x1000',
    ARRAY['Photography'],
    2024, false, 'published', 0
  ),
  (
    'Architecture Study',
    'Urban architecture exploration series.',
    'gallery', 'upload',
    'https://placehold.co/800x600',
    'https://placehold.co/800x600',
    ARRAY['Photography', 'Architecture'],
    2024, false, 'published', 1
  ),
  (
    'Type Experiments',
    'Typographic explorations and lettering studies.',
    'gallery', 'upload',
    'https://placehold.co/600x800',
    'https://placehold.co/600x800',
    ARRAY['Typography', 'Lettering'],
    2023, false, 'published', 2
  );
