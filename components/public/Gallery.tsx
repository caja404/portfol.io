'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { PortfolioItem } from '@/lib/types';

interface GalleryProps {
  items: PortfolioItem[];
}

function GalleryItem({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const src = item.upload_url || item.thumbnail_url;
  if (!src) return null;

  return (
    <div
      ref={ref}
      className="break-inside-avoid mb-4 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s`,
      }}
      onClick={() => onOpen(index)}
    >
      <div className="relative overflow-hidden group">
        <Image
          src={src}
          alt={item.title}
          width={800}
          height={600}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 transition-colors duration-300 bg-[#C4603A]/0 group-hover:bg-[#C4603A]/10" />
      </div>
      {item.title && (
        <p
          className="mt-2 text-[0.55rem] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(26,20,16,0.35)' }}
        >
          {item.title}
        </p>
      )}
    </div>
  );
}

export default function Gallery({ items }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = items
    .filter((i) => i.upload_url || i.thumbnail_url)
    .map((i) => ({ src: (i.upload_url || i.thumbnail_url)! }));

  return (
    <section id="gallery" className="py-24" style={{ background: 'var(--cream-deep)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-5 mb-16">
          <svg width="44" height="2" viewBox="0 0 44 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="44" y2="1" stroke="#C4603A" strokeWidth="1" strokeDasharray="5 3"/>
          </svg>
          <h2
            className="text-[0.58rem] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(26,20,16,0.38)' }}
          >
            Gallery
          </h2>
        </div>
        {items.length === 0 ? (
          <p className="text-sm" style={{ color: 'rgba(26,20,16,0.28)' }}>No gallery items published yet.</p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {items.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                onOpen={(idx) => { setIndex(idx); setOpen(true); }}
              />
            ))}
          </div>
        )}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images}
      />
    </section>
  );
}

