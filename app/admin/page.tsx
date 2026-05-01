import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [{ count: publishedCount }, { count: draftCount }, { data: recent }] = await Promise.all([
    supabase.from('portfolio_items').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('portfolio_items').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('portfolio_items').select('id, title, section, status, updated_at').order('updated_at', { ascending: false }).limit(5),
  ]);

  const name = user?.email?.split('@')[0] || 'there';

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-1">
        Hi {name}, ready to update your portfolio?
      </h1>
      <p className="text-sm text-zinc-400 mb-8">Manage your work and site content below.</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-zinc-100 p-5">
          <p className="text-3xl font-bold text-zinc-900">{publishedCount ?? 0}</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Published</p>
        </div>
        <div className="border border-zinc-100 p-5">
          <p className="text-3xl font-bold text-zinc-900">{draftCount ?? 0}</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Drafts</p>
        </div>
        <div className="border border-zinc-100 p-5">
          <p className="text-3xl font-bold text-zinc-900">{(publishedCount ?? 0) + (draftCount ?? 0)}</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Total</p>
        </div>
      </div>

      <Link
        href="/admin/upload"
        className="inline-block border border-zinc-900 text-zinc-900 text-sm px-6 py-2.5 hover:bg-zinc-900 hover:text-white transition-colors mb-10"
      >
        + Add New Item
      </Link>

      {/* Recent */}
      <div>
        <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-4">Recent Items</h2>
        {recent && recent.length > 0 ? (
          <div className="border border-zinc-100 divide-y divide-zinc-50">
            {recent.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{item.title}</p>
                  <p className="text-xs text-zinc-400 capitalize">{item.section} &middot; {item.status} &middot; {formatDate(item.updated_at)}</p>
                </div>
                <Link
                  href={`/admin/edit/${item.id}`}
                  className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No items yet. Add your first work above.</p>
        )}
      </div>
    </div>
  );
}
