import Link from 'next/link';
import Image from 'next/image';
import { PortfolioItem } from '@/lib/types';

interface ProjectCardProps {
  item: PortfolioItem;
}

export default function ProjectCard({ item }: ProjectCardProps) {
  const thumb = item.thumbnail_url || item.upload_url || null;

  return (
    <Link href={`/work/${item.id}`} className="group block">
      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden mb-4">
        {thumb ? (
          <Image
            src={thumb}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-zinc-300 text-sm">No preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/60 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white px-4 py-2">
            View Project
          </span>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 mb-1">{item.title}</h3>
      <div className="flex items-center gap-2 flex-wrap">
        {item.year && <span className="text-xs text-zinc-400">{item.year}</span>}
        {item.tags?.map((tag) => (
          <span key={tag} className="text-xs text-zinc-500 border border-zinc-200 px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
