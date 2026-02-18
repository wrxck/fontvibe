import type { FontAnalytics, AnalyticsReport } from './types.js';
import { selectorFor } from './selector.js';

function normalizeFontFamily(raw: string): string {
  return raw.replace(/["']/g, '').trim();
}

export function analyseFonts(): AnalyticsReport {
  const fontMap = new Map<string, FontAnalytics>();
  let totalElements = 0;

  // deep walk — no element cap
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let node: Node | null = walker.nextNode();

  while (node) {
    const el = node as Element;
    const computed = getComputedStyle(el);
    const family = normalizeFontFamily(computed.fontFamily.split(',')[0]);

    if (family && family !== 'inherit' && family !== 'initial') {
      totalElements++;
      const existing = fontMap.get(family);
      const weight = computed.fontWeight;
      const size = computed.fontSize;
      const selector = selectorFor(el);

      if (existing) {
        existing.elementCount++;
        if (!existing.weights.includes(weight)) existing.weights.push(weight);
        if (!existing.sizes.includes(size)) existing.sizes.push(size);
        if (existing.selectors.length < 10 && !existing.selectors.includes(selector)) {
          existing.selectors.push(selector);
        }
      } else {
        fontMap.set(family, {
          family,
          elementCount: 1,
          weights: [weight],
          sizes: [size],
          selectors: [selector],
        });
      }
    }
    node = walker.nextNode();
  }

  // find unused @font-face declarations
  const declaredFaces = new Set<string>();
  try {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            const family = normalizeFontFamily(rule.style.getPropertyValue('font-family'));
            if (family) declaredFaces.add(family);
          }
        }
      } catch {
        // cross-origin
      }
    }
  } catch {
    // no stylesheets
  }

  const usedFamilies = new Set(fontMap.keys());
  const unusedFontFaces = [...declaredFaces].filter(f => !usedFamilies.has(f));

  return {
    fonts: Array.from(fontMap.values()).sort((a, b) => b.elementCount - a.elementCount),
    unusedFontFaces,
    totalElements,
  };
}
