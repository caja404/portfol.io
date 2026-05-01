'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CanvaEmbedInput from './CanvaEmbedInput';
import DropZone from './DropZone';
import { PortfolioItem, SectionType, StatusType } from '@/lib/types';

interface ItemFormProps {
  item?: Partial<PortfolioItem>;
}

export default function ItemForm({ item }: ItemFormProps) {
  const router = useRouter();
  const isEdit = !!item?.id;

  const [assetSource, setAssetSource] = useState<'canva' | 'upload'>(
    item?.asset_type === 'upload' ? 'upload' : 'canva'
  );
  const [canvaRaw, setCanvaRaw] = useState(item?.canva_raw_url || '');
  const [canvaEmbed, setCanvaEmbed] = useState<string | null>(item?.canva_embed_url || null);
  const [uploadUrl, setUploadUrl] = useState(item?.upload_url || '');
  const [uploadPath, setUploadPath] = useState(item?.upload_path || '');

  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [section, setSection] = useState<SectionType>(item?.section || 'work');
  const [tags, setTags] = useState((item?.tags || []).join(', '));
  const [year, setYear] = useState(item?.year?.toString() || new Date().getFullYear().toString());
  const [isFeatured, setIsFeatured] = useState(item?.is_featured || false);
  const [status, setStatus] = useState<StatusType>(item?.status || 'draft');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);

    const payload = {
      title,
      description: description || null,
      section,
      asset_type: assetSource === 'canva' ? 'canva_embed' : 'upload',
      canva_embed_url: assetSource === 'canva' ? canvaEmbed : null,
      canva_raw_url: assetSource === 'canva' ? canvaRaw : null,
      upload_url: assetSource === 'upload' ? uploadUrl : null,
      upload_path: assetSource === 'upload' ? uploadPath : null,
      thumbnail_url: assetSource === 'upload' ? uploadUrl : null,
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      year: year ? parseInt(year) : null,
      is_featured: isFeatured,
      status,
    };

    const url = isEdit ? `/api/items/${item!.id}` : '/api/items';
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      toast.success(status === 'published' ? 'Item published!' : 'Draft saved.');
      router.push('/admin');
      router.refresh();
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Asset Source */}
      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Step 1 — Choose source</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAssetSource('canva')}
            className={`border p-4 text-left transition-colors ${
              assetSource === 'canva'
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
            }`}
          >
            <p className="text-sm font-semibold">Paste Canva Link</p>
            <p className="text-xs opacity-70 mt-0.5">Recommended</p>
          </button>
          <button
            type="button"
            onClick={() => setAssetSource('upload')}
            className={`border p-4 text-left transition-colors ${
              assetSource === 'upload'
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
            }`}
          >
            <p className="text-sm font-semibold">Upload a File</p>
            <p className="text-xs opacity-70 mt-0.5">Image / Video / PDF</p>
          </button>
        </div>

        <div className="mt-4">
          {assetSource === 'canva' ? (
            <CanvaEmbedInput
              value={canvaRaw}
              onChange={(raw, embed) => { setCanvaRaw(raw); setCanvaEmbed(embed); }}
            />
          ) : (
            <DropZone
              section={section}
              onUploaded={(url, path) => { setUploadUrl(url); setUploadPath(path); }}
            />
          )}
        </div>
      </div>

      {/* Details */}
      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Step 2 — Details</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Section *</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value as SectionType)}
                className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors bg-white"
              >
                <option value="work">Work</option>
                <option value="gallery">Gallery</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Branding, Print, Motion"
              className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="accent-zinc-900"
              />
              <span className="text-sm text-zinc-700">Featured</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-700">Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusType)}
                className="border border-zinc-200 px-2 py-1 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="border border-zinc-900 text-zinc-900 text-sm px-8 py-3 hover:bg-zinc-900 hover:text-white transition-colors disabled:opacity-50"
      >
        {saving
          ? 'Saving...'
          : status === 'published'
          ? 'Publish to Site'
          : 'Save Draft'}
      </button>
    </form>
  );
}
