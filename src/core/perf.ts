import type { FontPerfData } from './types.js';

const KB_PER_WEIGHT = 30;

export function getFontPerfData(families: string[]): FontPerfData[] {
  const results: FontPerfData[] = [];
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');

  for (const family of families) {
    let variantCount = 0;
    let displayStrategy = 'unknown';

    for (const link of links) {
      const href = link.href || '';
      if (!href.includes('fonts.googleapis.com')) continue;
      if (!href.includes(family.replace(/ /g, '+'))) continue;

      // parse weight list from url
      const wghtMatch = href.match(/wght@([^&]+)/);
      if (wghtMatch) {
        const weights = wghtMatch[1].split(';');
        variantCount = weights.length;
      }

      const displayMatch = href.match(/display=(\w+)/);
      displayStrategy = displayMatch ? displayMatch[1] : 'swap';
    }

    if (variantCount === 0) continue;

    const estimatedSize = variantCount * KB_PER_WEIGHT;
    let rating: FontPerfData['rating'] = 'green';
    if (estimatedSize > 150) rating = 'red';
    else if (estimatedSize > 90) rating = 'amber';

    results.push({ family, variantCount, estimatedSize, displayStrategy, rating });
  }

  return results;
}
