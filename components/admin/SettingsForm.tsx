'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface SettingsFormProps {
  initial: Record<string, string>;
}

const FIELDS = [
  { key: 'owner_name', label: 'Display Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'bio_short', label: 'Short Bio (Hero)' },
  { key: 'bio_long', label: 'Long Bio (About page)', multiline: true },
  { key: 'email', label: 'Contact Email' },
  { key: 'instagram', label: 'Instagram Username' },
  { key: 'behance', label: 'Behance Username' },
  { key: 'linkedin', label: 'LinkedIn Username' },
];

export default function SettingsForm({ initial }: SettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Settings saved.');
    } else {
      toast.error('Failed to save settings.');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-lg">
      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className="block text-xs text-zinc-500 mb-1">{field.label}</label>
          {field.multiline ? (
            <textarea
              rows={4}
              value={values[field.key] || ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors resize-none"
            />
          ) : (
            <input
              type="text"
              value={values[field.key] || ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={saving}
        className="border border-zinc-900 text-zinc-900 text-sm px-6 py-2.5 hover:bg-zinc-900 hover:text-white transition-colors disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
