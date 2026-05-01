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
      <footer className="py-10 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} {settings.owner_name}</p>
          <p className="text-xs text-zinc-600 uppercase tracking-widest">Portfolio</p>
        </div>
      </footer>
    </>
  );
}
