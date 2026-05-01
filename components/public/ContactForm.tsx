'use client';

import { useState } from 'react';

interface ContactFormProps {
  instagram?: string;
  behance?: string;
  linkedin?: string;
}

function FloatField({
  label,
  type = 'text',
  value,
  onChange,
  rows,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="field">
      {rows ? (
        <>
          <textarea
            rows={rows}
            placeholder=" "
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label>{label}</label>
        </>
      ) : (
        <>
          <input
            type={type}
            placeholder=" "
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label>{label}</label>
        </>
      )}
    </div>
  );
}

export default function ContactForm({ instagram, behance, linkedin }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  const socials = [
    { label: 'Instagram', href: instagram ? `https://instagram.com/${instagram}` : null },
    { label: 'Behance', href: behance ? `https://behance.net/${behance}` : null },
    { label: 'LinkedIn', href: linkedin ? `https://linkedin.com/in/${linkedin}` : null },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="py-24" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-5 mb-16">
          <svg width="44" height="2" viewBox="0 0 44 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="44" y2="1" stroke="#C4603A" strokeWidth="1" strokeDasharray="5 3"/>
          </svg>
          <h2
            className="text-[0.58rem] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(26,20,16,0.38)' }}
          >
            Contact
          </h2>
        </div>

        <div className="max-w-lg">
          {status === 'success' ? (
            <p
              className="border-l-2 border-[#C4603A] pl-4 py-1"
              style={{
                fontFamily: 'var(--font-cormorant, Georgia), serif',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: 'rgba(26,20,16,0.65)',
              }}
            >
              Message received. I will be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <FloatField
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <FloatField
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <FloatField
                label="Message"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                rows={4}
              />
              {status === 'error' && (
                <p className="text-[0.65rem] tracking-wide" style={{ color: 'var(--terracotta)' }}>
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto text-[0.62rem] tracking-[0.2em] uppercase px-10 py-4 rounded-[2px] hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50"
                style={{ background: 'var(--terracotta)', color: 'var(--cream)' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}

          {socials.length > 0 && (
            <div className="mt-14 flex gap-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-[0.58rem] tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(26,20,16,0.38)' }}
                >
                  {s.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: 'var(--terracotta)' }}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
