import type { FontPairing } from './types.js';

const CURATED_PAIRINGS: FontPairing[] = [
  { heading: 'Playfair Display', body: 'Source Sans 3', category: 'elegant', description: 'Classic serif heading with clean sans body' },
  { heading: 'Montserrat', body: 'Merriweather', category: 'modern', description: 'Geometric sans heading with readable serif body' },
  { heading: 'Oswald', body: 'Lato', category: 'bold', description: 'Condensed heading with friendly body' },
  { heading: 'Raleway', body: 'Roboto', category: 'minimal', description: 'Thin elegant heading with versatile body' },
  { heading: 'Poppins', body: 'Inter', category: 'modern', description: 'Geometric duo for modern interfaces' },
  { heading: 'DM Serif Display', body: 'DM Sans', category: 'elegant', description: 'Matching DM family, serif + sans' },
  { heading: 'Space Grotesk', body: 'Space Mono', category: 'tech', description: 'Technical feel, proportional + mono' },
  { heading: 'Bitter', body: 'Source Sans 3', category: 'editorial', description: 'Slab heading with neutral body for long reads' },
  { heading: 'Archivo Black', body: 'Archivo', category: 'bold', description: 'Heavy impact heading with matching body' },
  { heading: 'Fraunces', body: 'Commissioner', category: 'elegant', description: 'Expressive serif with variable sans body' },
  { heading: 'Sora', body: 'Noto Sans', category: 'clean', description: 'Modern geometric heading with universal body' },
  { heading: 'Crimson Pro', body: 'Work Sans', category: 'editorial', description: 'Refined serif heading with geometric body' },
  { heading: 'Lexend', body: 'Lexend', category: 'readable', description: 'Optimized for reading, single family' },
  { heading: 'Outfit', body: 'Plus Jakarta Sans', category: 'modern', description: 'Fresh geometric pair for SaaS/startup' },
  { heading: 'Cormorant Garamond', body: 'Fira Sans', category: 'elegant', description: 'Ornate display serif with technical sans' },
];

const CATEGORY_MAP: Record<string, string[]> = {
  serif: ['serif', 'elegant', 'editorial'],
  'sans-serif': ['modern', 'clean', 'minimal', 'bold'],
  display: ['bold', 'elegant', 'tech'],
  handwriting: ['elegant'],
  monospace: ['tech'],
};

export function suggestPairings(fontFamily?: string, category?: string): FontPairing[] {
  if (!fontFamily && !category) return CURATED_PAIRINGS.slice(0, 5);

  let results = CURATED_PAIRINGS;

  if (category) {
    results = results.filter(p => p.category === category);
  }

  if (fontFamily) {
    const name = fontFamily.toLowerCase();
    const exact = results.filter(p =>
      p.heading.toLowerCase() === name || p.body.toLowerCase() === name
    );
    if (exact.length) return exact;

    // match by category heuristic
    const cats = Object.entries(CATEGORY_MAP).find(([, cats]) =>
      cats.some(c => results.some(p => p.category === c))
    );
    if (cats) {
      const filtered = results.filter(p => CATEGORY_MAP[cats[0]]?.includes(p.category));
      if (filtered.length) return filtered.slice(0, 5);
    }
  }

  return results.slice(0, 5);
}

export function getAllPairings(): FontPairing[] {
  return CURATED_PAIRINGS;
}
