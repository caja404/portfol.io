import { createClient } from '@/lib/supabase/server';
import ItemList from '@/components/admin/ItemList';
import Link from 'next/link';

export default async function AllItemsPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">All Items</h1>
        <Link
          href="/admin/upload"
          className="border border-zinc-900 text-zinc-900 text-sm px-4 py-2 hover:bg-zinc-900 hover:text-white transition-colors"
        >
          + Add New
        </Link>
      </div>
      <ItemList initialItems={items || []} />
    </div>
  );
}
