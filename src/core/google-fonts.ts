import type { GoogleFont, GoogleFontsResponse } from './types.js';

const API_BASE = 'https://www.googleapis.com/webfonts/v1/webfonts';

let fontCache: GoogleFont[] | null = null;

export async function fetchGoogleFonts(apiKey: string): Promise<GoogleFont[]> {
  if (fontCache) return fontCache;

  const url = `${API_BASE}?key=${encodeURIComponent(apiKey)}&sort=popularity`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Fonts API error: ${res.status}`);

  const data: GoogleFontsResponse = await res.json();
  fontCache = data.items.map((item, i) => ({
    family: item.family,
    variants: item.variants,
    subsets: item.subsets,
    category: item.category,
    lastModified: item.lastModified,
    popularity: i + 1,
  }));

  return fontCache;
}

export async function searchGoogleFonts(apiKey: string, query: string): Promise<GoogleFont[]> {
  const all = await fetchGoogleFonts(apiKey);
  const q = query.toLowerCase();
  return all.filter(f =>
    f.family.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q)
  );
}

export function googleFontUrl(family: string, weights?: string[]): string {
  const w = weights?.length ? weights.join(';') : '400;700';
  const encoded = family.replace(/ /g, '+');
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${w}&display=swap`;
}

export function clearFontCache(): void {
  fontCache = null;
}
