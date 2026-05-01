import Link from 'next/link';
import Image from 'next/image';
import { PortfolioItem } from '@/lib/types';

interface ProjectCardProps {
  item: PortfolioItem;
  index: number;
}

export default function ProjectCard({ item, index }: ProjectCardProps) {
  const thumb = item.thumbnail_url || item.upload_url || null;
  const num = String(index + 1).padStart(2, '0');

  return (
    <Link href={`/work/${item.id}`} className="group block relative">
      {/* Faint project number */}
      <span
        className="absolute -top-6 -left-1 leading-none select-none pointer-events-none z-0"
        style={{
          fontFamily: 'var(--font-cormorant, Georgia), serif',
          fontWeight: 700,
          fontSize: '5rem',
          color: 'rgba(26,20,16,0.045)',
        }}
      >
        {num}
      </span>

      {/* Image container */}
      <div
        className="relative aspect-[4/3] overflow-hidden mb-5 z-10 transition-all duration-500"
        style={{ background: 'var(--cream-deep)' }}
      >
        {/* Hover lift shadow */}
        <div className="absolute inset-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(196,96,58,0.18)]" />

        {thumb ? (
          <Image
            src={thumb}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm" style={{ color: 'rgba(26,20,16,0.2)' }}>No preview</span>
          </div>
        )}

        {/* Terracotta overlay */}
        <div className="absolute inset-0 transition-colors duration-400 bg-[#C4603A]/0 group-hover:bg-[#C4603A]/14" />

        {/* Title slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
          <span
            className="text-[0.6rem] tracking-[0.22em] uppercase"
            style={{ color: 'var(--cream)', fontWeight: 300 }}
          >
            View Project →
          </span>
        </div>
      </div>

      {/* Text block also lifts */}
      <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
        <h3
          className="text-[#1A1410] mb-2 leading-tight"
          style={{
            fontFamily: 'var(--font-cormorant, Georgia), serif',
            fontWeight: 600,
            fontSize: '1.2rem',
          }}
        >
          {item.title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {item.year && (
            <span
              className="text-[0.58rem] tracking-wider uppercase"
              style={{ color: 'rgba(26,20,16,0.35)' }}
            >
              {item.year}
            </span>
          )}
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[0.55rem] tracking-wider uppercase px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(139,158,122,0.18)', color: '#4d6b3c' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
