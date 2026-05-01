'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  section: string;
  onUploaded: (url: string, path: string) => void;
}

export default function DropZone({ section, onUploaded }: DropZoneProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const file = accepted[0];
      if (!file) return;
      setUploading(true);
      setError(null);
      setProgress(10);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', section);

      try {
        setProgress(40);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        setProgress(80);
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        setProgress(100);
        setPreview({ url: data.url, name: file.name });
        onUploaded(data.url, data.path);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [section, onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/mp4': [], 'application/pdf': [] },
    maxSize: 50 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed border-zinc-200 p-10 text-center cursor-pointer transition-colors',
          isDragActive && 'border-zinc-900 bg-zinc-50'
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-zinc-500">
          {isDragActive
            ? 'Drop the file here'
            : 'Drag your image, video, or PDF here — or click to browse'}
        </p>
        <p className="text-xs text-zinc-400 mt-1">Max 50MB</p>
      </div>

      {uploading && (
        <div className="mt-3">
          <div className="h-1 bg-zinc-100">
            <div
              className="h-1 bg-zinc-900 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-zinc-400 mt-1">Uploading...</p>
        </div>
      )}

      {preview && !uploading && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-zinc-500">{preview.name}</span>
          <span className="text-xs text-zinc-400">— uploaded</span>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
