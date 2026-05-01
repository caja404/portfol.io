export type SectionType = 'work' | 'gallery' | 'about' | 'contact';
export type AssetType = 'canva_embed' | 'upload';
export type StatusType = 'draft' | 'published';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  section: SectionType;
  asset_type: AssetType;
  canva_embed_url: string | null;
  canva_raw_url: string | null;
  upload_url: string | null;
  upload_path: string | null;
  thumbnail_url: string | null;
  tags: string[] | null;
  year: number | null;
  is_featured: boolean;
  status: StatusType;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

export type SiteSettings = Record<string, string>;
