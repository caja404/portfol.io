import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #ebebeb',
  borderRadius: 6,
  padding: '20px 22px',
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [{ count: publishedCount }, { count: draftCount }, { count: msgCount }, { data: recent }] = await Promise.all([
    supabase.from('portfolio_items').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('portfolio_items').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('portfolio_items').select('id, title, section, status, updated_at').order('updated_at', { ascending: false }).limit(6),
  ]);

  const name = user?.email?.split('@')[0] || 'there';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 5 }}>
          Hi {name} 👋
        </h1>
        <p style={{ fontSize: '0.82rem', color: '#999' }}>Here's an overview of your portfolio.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
        {[
          { value: publishedCount ?? 0, label: 'Published' },
          { value: draftCount ?? 0, label: 'Drafts' },
          { value: msgCount ?? 0, label: 'Messages' },
        ].map(({ value, label }) => (
          <div key={label} style={card}>
            <p style={{ fontSize: '2.1rem', fontWeight: 700, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>{value}</p>
            <p style={{ fontSize: '0.62rem', color: '#bbb', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 36 }}>
        {[
          { label: '+ Add Work Item', href: '/admin/upload', sub: 'New portfolio piece' },
          { label: 'Manage Items', href: '/admin/items', sub: 'Edit, reorder, delete' },
          { label: 'Site Settings', href: '/admin/settings', sub: 'Name, bio, social links' },
        ].map(({ label, href, sub }) => (
          <Link
            key={href}
            href={href}
            style={{ ...card, display: 'block', textDecoration: 'none' }}
          >
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111', marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: '0.72rem', color: '#bbb' }}>{sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent items */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb' }}>Recent Items</p>
          <Link href="/admin/items" style={{ fontSize: '0.74rem', color: '#C4603A', textDecoration: 'none' }}>View all →</Link>
        </div>
        {recent && recent.length > 0 ? (
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 6, overflow: 'hidden' }}>
            {recent.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: i < recent.length - 1 ? '1px solid #f5f5f5' : 'none',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.84rem', fontWeight: 500, color: '#111' }}>{item.title}</p>
                  <p style={{ fontSize: '0.7rem', color: '#bbb', marginTop: 2, textTransform: 'capitalize' }}>
                    {item.section} · {item.status} · {formatDate(item.updated_at)}
                  </p>
                </div>
                <Link
                  href={`/admin/edit/${item.id}`}
                  style={{ fontSize: '0.72rem', color: '#C4603A', textDecoration: 'none', marginLeft: 20, whiteSpace: 'nowrap' }}
                >
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ ...card, textAlign: 'center', padding: '32px 24px' }}>
            <p style={{ fontSize: '0.84rem', color: '#bbb', marginBottom: 14 }}>No items yet.</p>
            <Link
              href="/admin/upload"
              style={{ fontSize: '0.78rem', color: '#C4603A', textDecoration: 'none', fontWeight: 500 }}
            >
              Add your first work item →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
