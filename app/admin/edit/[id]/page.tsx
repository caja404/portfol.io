import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ItemForm from '@/components/admin/ItemForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">Edit Item</h1>
      <ItemForm item={item} />
    </div>
  );
}
