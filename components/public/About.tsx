interface AboutProps {
  bio: string;
  email: string;
}

export default function About({ bio, email }: AboutProps) {
  return (
    <section id="about" className="py-24" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-5 mb-16">
          <svg width="44" height="2" viewBox="0 0 44 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="44" y2="1" stroke="#C4603A" strokeWidth="1" strokeDasharray="5 3"/>
          </svg>
          <h2
            className="text-[0.58rem] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(26,20,16,0.38)' }}
          >
            About
          </h2>
        </div>

        <div className="max-w-2xl">
          {/* Pull-quote style bio */}
          <div className="border-l-2 border-[#C4603A] pl-8 mb-12">
            <p
              className="whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-cormorant, Georgia), serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.2rem, 2.4vw, 1.55rem)',
                lineHeight: 1.85,
                color: 'rgba(26,20,16,0.75)',
              }}
            >
              {bio}
            </p>
          </div>

          {/* Corner ornament */}
          <svg className="mb-8" width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.25 }}>
            <path d="M0 0 L18 0 M0 0 L0 18" stroke="#D4A847" strokeWidth="1"/>
            <circle cx="18" cy="18" r="2.5" fill="#D4A847"/>
          </svg>

          {email && (
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 text-sm"
              style={{ color: 'rgba(26,20,16,0.65)', fontWeight: 300 }}
            >
              <span style={{ color: 'var(--terracotta)' }}>&#9993;</span>
              <span className="relative">
                {email}
                <span
                  className="absolute bottom-0 left-0 w-0 h-px transition-all duration-350 group-hover:w-full"
                  style={{ background: 'var(--gold)' }}
                />
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
