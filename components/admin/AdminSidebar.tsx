'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Work Items', href: '/admin/items' },
  { label: 'Add New', href: '/admin/upload' },
  { label: 'Site Settings', href: '/admin/settings' },
  { label: 'Messages', href: '/admin/messages' },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside
      style={{
        width: 212,
        background: '#fff',
        borderRight: '1px solid #ebebeb',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid #f2f2f2' }}>
        <p
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4603A',
            fontWeight: 600,
            marginBottom: 5,
          }}
        >
          Admin
        </p>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>
          Portfolio CMS
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 0' }}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '9px 18px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? '#C4603A' : '#555',
                background: isActive ? 'rgba(196,96,58,0.06)' : 'transparent',
                borderLeft: `2px solid ${isActive ? '#C4603A' : 'transparent'}`,
                textDecoration: 'none',
                transition: 'color 0.12s ease, background 0.12s ease',
              }}
            >
              {item.label}
            </Link>
          );
        })}

        <div style={{ margin: '12px 18px', borderTop: '1px solid #f2f2f2' }} />

        <Link
          href="/"
          target="_blank"
          style={{
            display: 'block',
            padding: '8px 18px',
            fontSize: '0.78rem',
            color: '#aaa',
            textDecoration: 'none',
            borderLeft: '2px solid transparent',
          }}
        >
          ↗ View Site
        </Link>
      </nav>

      {/* Logout */}
      <div style={{ padding: '14px 18px', borderTop: '1px solid #f2f2f2' }}>
        <button
          onClick={handleLogout}
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#bbb',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#111';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#bbb';
          }}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
