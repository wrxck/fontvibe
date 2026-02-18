import type { DetectedFont } from './types.js';
import { selectorFor } from './selector.js';

function normalizeFontFamily(raw: string): string {
  return raw.replace(/["']/g, '').trim();
}

function detectFromDocumentFonts(): Map<string, DetectedFont> {
  const map = new Map<string, DetectedFont>();
  if (!document.fonts) return map;

  for (const face of document.fonts) {
    const family = normalizeFontFamily(face.family);
    if (!family) continue;
    const existing = map.get(family);
    if (existing) {
      if (face.weight && !existing.weight?.includes(face.weight)) {
        existing.weight = existing.weight ? `${existing.weight},${face.weight}` : face.weight;
      }
    } else {
      map.set(family, {
        family,
        source: 'document-fonts',
        weight: face.weight || undefined,
        style: face.style !== 'normal' ? face.style : undefined,
        selectors: [],
        elementCount: 0,
      });
    }
  }
  return map;
}

function detectFromComputedStyles(limit = 500): Map<string, DetectedFont> {
  const map = new Map<string, DetectedFont>();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let count = 0;
  let node: Node | null = walker.nextNode();

  while (node && count < limit) {
    const el = node as Element;
    const computed = getComputedStyle(el);
    const families = computed.fontFamily.split(',');

    for (const raw of families) {
      const family = normalizeFontFamily(raw);
      if (!family || family === 'inherit' || family === 'initial') continue;

      const existing = map.get(family);
      const selector = selectorFor(el);
      if (existing) {
        existing.elementCount++;
        if (existing.selectors.length < 5 && !existing.selectors.includes(selector)) {
          existing.selectors.push(selector);
        }
      } else {
        map.set(family, {
          family,
          source: 'computed-style',
          weight: computed.fontWeight,
          selectors: [selector],
          elementCount: 1,
        });
      }
      break; // only count primary font
    }
    count++;
    node = walker.nextNode();
  }
  return map;
}

function detectFromFontFace(): Map<string, DetectedFont> {
  const map = new Map<string, DetectedFont>();
  try {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            const family = normalizeFontFamily(rule.style.getPropertyValue('font-family'));
            if (family && !map.has(family)) {
              map.set(family, {
                family,
                source: 'font-face',
                weight: rule.style.getPropertyValue('font-weight') || undefined,
                style: rule.style.getPropertyValue('font-style') || undefined,
                selectors: [],
                elementCount: 0,
              });
            }
          }
        }
      } catch {
        // cross-origin stylesheet, skip
      }
    }
  } catch {
    // no stylesheets accessible
  }
  return map;
}

export function detectFonts(): DetectedFont[] {
  const merged = new Map<string, DetectedFont>();

  const fromFonts = detectFromDocumentFonts();
  const fromStyles = detectFromComputedStyles();
  const fromFace = detectFromFontFace();

  for (const [family, font] of fromFonts) merged.set(family, font);

  for (const [family, font] of fromStyles) {
    const existing = merged.get(family);
    if (existing) {
      existing.selectors = font.selectors;
      existing.elementCount = font.elementCount;
    } else {
      merged.set(family, font);
    }
  }

  for (const [family, font] of fromFace) {
    if (!merged.has(family)) merged.set(family, font);
  }

  return Array.from(merged.values()).sort((a, b) => b.elementCount - a.elementCount);
}
