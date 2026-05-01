'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = 0, y = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    };

    const animateRing = () => {
      ringX += (x - ringX) * 0.1;
      ringY += (y - ringY) * 0.1;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      rafId = requestAnimationFrame(animateRing);
    };

    const onEnter = () => {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.opacity = '0.8';
    };

    const onLeave = () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.opacity = '0.4';
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animateRing);

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div className="w-2 h-2 rounded-full bg-[#C4603A]" />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full hidden md:block"
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid #C4603A',
          opacity: '0.4',
          transition: 'width 0.35s ease, height 0.35s ease, opacity 0.35s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
