'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ddd',
    padding: '8px 0',
    fontSize: '0.9rem',
    color: '#111',
    background: 'transparent',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#aaa',
    marginBottom: 6,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid #ebebeb',
          borderRadius: 8,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 360,
        }}
      >
        {/* Logo mark */}
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C4603A',
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Admin
          </p>
          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#111',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C4603A'; }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = '#ddd'; }}
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C4603A'; }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = '#ddd'; }}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: '0.75rem',
                color: '#d44',
                marginBottom: 16,
                padding: '8px 12px',
                background: 'rgba(220,68,68,0.06)',
                borderRadius: 4,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#ddd' : '#C4603A',
              color: '#fff',
              border: 'none',
              padding: '11px 0',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius: 4,
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
