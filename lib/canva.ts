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
    // Preserve the full pathname (including view token) up to /view
    // e.g. /design/DAHIZzkklos/g601CH19VAZ_5hn58mGTDQ/view → keep as-is
    let pathname = parsed.pathname.replace(/\/$/, '');
    if (!pathname.endsWith('/view')) {
      // If /view is somewhere in the path, truncate after it
      const viewIdx = pathname.lastIndexOf('/view');
      if (viewIdx !== -1) {
        pathname = pathname.substring(0, viewIdx + 5);
      } else {
        pathname = pathname + '/view';
      }
    }
    return `https://www.canva.com${pathname}?embed`;
  } catch {
    return null;
  }
}
