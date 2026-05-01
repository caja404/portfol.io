import { createClient } from '@/lib/supabase/server';
import Nav from '@/components/public/Nav';
import Hero from '@/components/public/Hero';
import WorkGrid from '@/components/public/WorkGrid';
import Gallery from '@/components/public/Gallery';
import About from '@/components/public/About';
import ContactForm from '@/components/public/ContactForm';
import { SiteSettings, PortfolioItem } from '@/lib/types';

async function getSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('*');
  const settings: SiteSettings = {};
  for (const row of data || []) {
    settings[row.key] = row.value;
  }
  return settings;
}

async function getItems(section: string): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('section', section)
    .eq('status', 'published')
    .order('sort_order', { ascending: true });
  return data || [];
}

export default async function HomePage() {
  const [settings, workItems, galleryItems] = await Promise.all([
    getSettings(),
    getItems('work'),
    getItems('gallery'),
  ]);

  return (
    <>
      <Nav ownerName={settings.owner_name || 'Portfolio'} />
      <main>
        <Hero
          name={settings.owner_name || 'Your Name'}
          tagline={settings.tagline || ''}
          bio={settings.bio_short || ''}
          heroLabel={settings.hero_label}
        />
        <WorkGrid items={workItems} />
        <Gallery items={galleryItems} />
        <About bio={settings.bio_long || ''} email={settings.email || ''} />
        <ContactForm
          instagram={settings.instagram}
          behance={settings.behance}
          linkedin={settings.linkedin}
        />
      </main>
      <footer className="py-16 relative overflow-hidden" style={{ background: 'var(--ink)' }}>
        {/* Watermark initials */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="leading-none"
            style={{
              fontFamily: 'var(--font-cormorant, Georgia), serif',
              fontWeight: 700,
              fontSize: 'clamp(8rem, 22vw, 18rem)',
              color: 'rgba(255,255,255,0.03)',
            }}
          >
            {(settings.owner_name || '').split(' ').map((w: string) => w[0]).join('')}
          </span>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 flex items-center justify-between">
          <p
            className="text-[0.6rem] tracking-[0.18em]"
            style={{ color: 'rgba(245,240,232,0.28)' }}
          >
            &copy; {new Date().getFullYear()} {settings.owner_name}
          </p>
          <p
            className="text-[0.6rem] italic"
            style={{ fontFamily: 'var(--font-cormorant, Georgia), serif', color: 'rgba(245,240,232,0.18)' }}
          >
            Portfolio
          </p>
        </div>
      </footer>
    </>
  );
}
