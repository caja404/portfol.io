'use client';

import { useState } from 'react';

interface ContactFormProps {
  instagram?: string;
  behance?: string;
  linkedin?: string;
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
    <section id="contact" className="py-24 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-12">Contact</h2>
        <div className="max-w-lg">
          {status === 'success' ? (
            <p className="text-zinc-900 text-sm border border-zinc-200 px-4 py-3">
              Message sent. I will get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors resize-none"
                />
              </div>
              {status === 'error' && (
                <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="border border-zinc-900 text-zinc-900 text-sm px-6 py-2 hover:bg-zinc-900 hover:text-white transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
          {socials.length > 0 && (
            <div className="mt-12 flex gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
