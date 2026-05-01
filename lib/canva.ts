export function isCanvaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'www.canva.com' || parsed.hostname === 'canva.com'
    ) && /\/design\/[A-Za-z0-9_-]+/.test(parsed.pathname);
  } catch {
    return false;
  }
}

export function toCanvaEmbedUrl(url: string): string | null {
  if (!isCanvaUrl(url)) return null;
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/design\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    const designId = match[1];
    return `https://www.canva.com/design/${designId}/view?embed`;
  } catch {
    return null;
  }
}
