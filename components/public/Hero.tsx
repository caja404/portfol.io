'use client';

import { useEffect, useRef } from 'react';

interface HeroProps {
  name: string;
  tagline: string;
  bio: string;
  heroLabel?: string;
}

export default function Hero({ name, tagline, bio, heroLabel }: HeroProps) {
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!nameRef.current) return;
      nameRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pt-16 overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Terracotta watercolor wash */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,96,58,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full pb-24 pt-8">
        {/* Parallax name block */}
        <div ref={nameRef} className="mb-12" style={{ willChange: 'transform' }}>
          <p className="text-[0.58rem] tracking-[0.38em] uppercase mb-8" style={{ color: 'rgba(26,20,16,0.32)' }}>
            {heroLabel || 'Creative Portfolio'}
          </p>

          {/* Decorative wave flourish */}
          <svg className="mb-5" width="64" height="16" viewBox="0 0 64 16" fill="none" style={{ opacity: 0.22 }}>
            <path d="M0 8 Q16 2 32 8 Q48 14 64 8" stroke="#C4603A" strokeWidth="1.2" fill="none" />
          </svg>

          <h1
            className="text-[#1A1410] leading-[0.88]"
            style={{
              fontFamily: 'var(--font-cormorant, Georgia), serif',
              fontWeight: 600,
              fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            {name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <p
              className="mb-3 leading-snug"
              style={{
                fontFamily: 'var(--font-cormorant, Georgia), serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
                color: 'rgba(26,20,16,0.72)',
              }}
            >
              {tagline}
            </p>
            <div className="w-14 h-px" style={{ background: 'var(--terracotta)' }} />
          </div>

          <div>
            <p
              className="leading-relaxed mb-8 max-w-xs text-sm"
              style={{ fontWeight: 300, lineHeight: 1.8, color: 'rgba(26,20,16,0.52)' }}
            >
              {bio}
            </p>
            <a
              href="#work"
              className="btn-terracotta inline-flex items-center gap-3 text-[0.62rem] tracking-[0.18em] uppercase rounded-[2px] px-8 py-3.5"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.48rem] tracking-[0.38em] uppercase" style={{ color: 'rgba(26,20,16,0.22)' }}>
          Scroll
        </span>
        <div className="w-px h-10 scroll-pulse" style={{ background: 'var(--terracotta)' }} />
      </div>
    </section>
  );
}

