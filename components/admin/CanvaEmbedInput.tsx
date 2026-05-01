'use client';

import { useState, useEffect } from 'react';
import { isCanvaUrl, toCanvaEmbedUrl } from '@/lib/canva';

interface CanvaEmbedInputProps {
  value: string;
  onChange: (raw: string, embed: string | null) => void;
}

export default function CanvaEmbedInput({ value, onChange }: CanvaEmbedInputProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!value) { setValid(null); setEmbedUrl(null); return; }
    const embed = toCanvaEmbedUrl(value);
    setEmbedUrl(embed);
    setValid(embed !== null);
    onChange(value, embed);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value, toCanvaEmbedUrl(e.target.value))}
        placeholder="https://www.canva.com/design/..."
        className="w-full border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
      />
      {value && valid === true && (
        <p className="mt-1 text-xs text-zinc-500">Canva link detected</p>
      )}
      {value && valid === false && (
        <p className="mt-1 text-xs text-red-500">
          This does not look like a Canva link. Try the Upload option below.
        </p>
      )}
      {embedUrl && (
        <div className="mt-4">
          <iframe
            src={embedUrl}
            title="Canva preview"
            className="w-full h-64 border border-zinc-200"
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
