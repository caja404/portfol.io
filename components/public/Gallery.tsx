'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { PortfolioItem } from '@/lib/types';

interface GalleryProps {
  items: PortfolioItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = items
    .filter((i) => i.upload_url || i.thumbnail_url)
    .map((i) => ({ src: (i.upload_url || i.thumbnail_url)! }));

  return (
    <section id="gallery" className="py-24 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-12">Gallery</h2>
        {items.length === 0 ? (
          <p className="text-zinc-400 text-sm">No gallery items published yet.</p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {items.map((item, i) => {
              const src = item.upload_url || item.thumbnail_url;
              if (!src) return null;
              return (
                <div
                  key={item.id}
                  className="break-inside-avoid cursor-pointer"
                  onClick={() => { setIndex(i); setOpen(true); }}
                >
                  <div className="relative overflow-hidden bg-zinc-100 group">
                    <Image
                      src={src}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-opacity group-hover:opacity-80"
                    />
                  </div>
                </div>
              );
            })}
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
