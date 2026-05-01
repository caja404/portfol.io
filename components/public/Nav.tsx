'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface NavProps {
  ownerName: string;
}

export default function Nav({ ownerName }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled
            ? 'backdrop-blur-md border-b border-[#D4A847]/15'
            : 'border-b border-transparent'
        )}
        style={{ background: scrolled ? 'rgba(245,240,232,0.88)' : 'transparent' }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl italic text-[#1A1410] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant, Georgia), serif', fontWeight: 400 }}
          >
            {ownerName}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative group text-[0.62rem] tracking-[0.22em] uppercase text-[#1A1410]/55 hover:text-[#1A1410] transition-colors duration-200"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4603A] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn('block h-px w-6 bg-[#1A1410] transition-all duration-300', menuOpen && 'rotate-45 translate-y-[9px]')} />
            <span className={cn('block h-px w-6 bg-[#1A1410] transition-all duration-300', menuOpen && 'opacity-0')} />
            <span className={cn('block h-px w-6 bg-[#1A1410] transition-all duration-300', menuOpen && '-rotate-45 -translate-y-[9px]')} />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'var(--cream)' }}
      >
        <ul className="flex flex-col items-center gap-10">
          {links.map((link, i) => (
            <li
              key={link.href}
              className={cn(
                'transition-all duration-500',
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              )}
              style={{ transitionDelay: menuOpen ? `${i * 70 + 100}ms` : '0ms' }}
            >
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-5xl italic text-[#1A1410] hover:text-[#C4603A] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-cormorant, Georgia), serif', fontWeight: 400 }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

