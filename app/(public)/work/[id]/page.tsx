import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CanvaEmbed from '@/components/public/CanvaEmbed';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error || !item) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link
          href="/#work"
          className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest mb-12 block"
        >
          &larr; Back
        </Link>

        {item.asset_type === 'canva_embed' && item.canva_embed_url ? (
          <CanvaEmbed embedUrl={item.canva_embed_url} title={item.title} />
        ) : item.upload_url ? (
          <div className="relative w-full aspect-video bg-zinc-100">
            <Image
              src={item.upload_url}
              alt={item.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : null}

        <div className="mt-10 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-3">{item.title}</h1>
          {item.year && <p className="text-sm text-zinc-400 mb-4">{item.year}</p>}
          {item.description && (
            <p className="text-zinc-600 leading-relaxed mb-6">{item.description}</p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <span key={tag} className="text-xs border border-zinc-200 px-2 py-0.5 text-zinc-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
