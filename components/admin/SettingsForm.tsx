'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface SettingsFormProps {
  initial: Record<string, string>;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid #e0e0e0',
  padding: '6px 0 8px',
  fontSize: '0.88rem',
  color: '#111',
  background: 'transparent',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.62rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#aaa',
  marginBottom: 4,
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '0.62rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#C4603A',
  fontWeight: 600,
  marginBottom: 16,
  paddingBottom: 8,
  borderBottom: '1px solid #f0f0f0',
};

const FIELD_GROUPS = [
  {
    heading: 'Identity',
    fields: [
      { key: 'owner_name', label: 'Your Name' },
      { key: 'hero_label', label: 'Hero Label (small text above name)' },
      { key: 'tagline', label: 'Tagline / Role' },
    ],
  },
  {
    heading: 'Bio',
    fields: [
      { key: 'bio_short', label: 'Short Bio (shown in Hero section)' },
      { key: 'bio_long', label: 'Long Bio (shown in About section)', multiline: true },
    ],
  },
  {
    heading: 'Contact & Social',
    fields: [
      { key: 'email', label: 'Email Address' },
      { key: 'instagram', label: 'Instagram Username' },
      { key: 'behance', label: 'Behance Username' },
      { key: 'linkedin', label: 'LinkedIn (e.g. in/yourname)' },
      { key: 'twitter', label: 'Twitter / X Username' },
      { key: 'dribbble', label: 'Dribbble Username' },
    ],
  },
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
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 5 }}>Site Settings</h1>
        <p style={{ fontSize: '0.82rem', color: '#999' }}>These values appear on your public portfolio page.</p>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 560 }}>
          {FIELD_GROUPS.map((group) => (
            <div key={group.heading}>
              <p style={sectionHeadingStyle}>{group.heading}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label style={labelStyle}>{field.label}</label>
                    {field.multiline ? (
                      <textarea
                        rows={4}
                        value={values[field.key] || ''}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C4603A'; }}
                        onBlur={(e) => { e.currentTarget.style.borderBottomColor = '#e0e0e0'; }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[field.key] || ''}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C4603A'; }}
                        onBlur={(e) => { e.currentTarget.style.borderBottomColor = '#e0e0e0'; }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            style={{
              alignSelf: 'flex-start',
              background: saving ? '#ddd' : '#C4603A',
              color: '#fff',
              border: 'none',
              padding: '10px 28px',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              fontWeight: 500,
              cursor: saving ? 'not-allowed' : 'pointer',
              borderRadius: 4,
              transition: 'background 0.2s',
            }}
          >
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
