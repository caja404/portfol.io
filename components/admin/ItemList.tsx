'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { PortfolioItem, SectionType } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ItemListProps {
  initialItems: PortfolioItem[];
}

const SECTION_TABS: { label: string; value: SectionType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Work', value: 'work' },
  { label: 'Gallery', value: 'gallery' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' },
];

const STATUS_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
];

export default function ItemList({ initialItems }: ItemListProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [sectionFilter, setSectionFilter] = useState<SectionType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const filtered = items.filter((item) => {
    const matchSection = sectionFilter === 'all' || item.section === sectionFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSection && matchStatus;
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    await Promise.all(
      reordered.map((item, index) =>
        fetch(`/api/items/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sort_order: index }),
        })
      )
    );
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success('Item deleted.');
    } else {
      toast.error('Failed to delete item.');
    }
    setConfirmDelete(null);
    router.refresh();
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <div className="flex gap-1">
          {SECTION_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSectionFilter(tab.value)}
              className={`text-xs px-3 py-1 border transition-colors ${
                sectionFilter === tab.value
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`text-xs px-3 py-1 border transition-colors ${
                statusFilter === tab.value
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-400 py-8">No items found.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="border border-zinc-200 divide-y divide-zinc-100">
              {/* Header */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 bg-zinc-50">
                <span className="w-5" />
                <span className="text-xs text-zinc-400 uppercase tracking-widest">Title</span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest w-16">Section</span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest w-16">Status</span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest w-24">Actions</span>
              </div>
              {filtered.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 items-center">
                    <span className="w-5 text-zinc-300 text-xs">&#8597;</span>
                    <div>
                      <p className="text-sm text-zinc-900 font-medium">{item.title}</p>
                      <p className="text-xs text-zinc-400">{formatDate(item.updated_at)}</p>
                    </div>
                    <span className="text-xs text-zinc-500 w-16 capitalize">{item.section}</span>
                    <span
                      className={`text-xs w-16 capitalize ${
                        item.status === 'published' ? 'text-zinc-900' : 'text-zinc-400'
                      }`}
                    >
                      {item.status}
                    </span>
                    <div className="flex gap-3 w-24">
                      <Link
                        href={`/admin/edit/${item.id}`}
                        className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        Edit
                      </Link>
                      {confirmDelete === item.id ? (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(item.id)}
                          className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
