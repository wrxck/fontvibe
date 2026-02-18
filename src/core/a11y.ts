import type { FontAnalytics, A11yIssue } from './types.js';

const DISPLAY_CATEGORIES = ['display', 'handwriting', 'decorative'];

const BODY_SELECTORS = ['body', 'p', 'li', 'span', 'a', 'td', 'div', 'article', 'section', 'main'];

export function checkAccessibility(fonts: FontAnalytics[]): A11yIssue[] {
  const issues: A11yIssue[] = [];

  for (const font of fonts) {
    // thin weight on body text
    const hasThinWeight = font.weights.some(w => {
      const n = parseInt(w, 10);
      return !isNaN(n) && n < 300;
    });
    const isBodyFont = font.selectors.some(s =>
      BODY_SELECTORS.some(bs => s === bs || s.startsWith(bs + '.'))
    );

    if (hasThinWeight && isBodyFont) {
      issues.push({
        type: 'thin-weight',
        family: font.family,
        selector: font.selectors[0],
        message: `"${font.family}" uses thin weight (<300) on body text — may be hard to read`,
        severity: 'warning',
      });
    }

    // small font size
    const hasSmallSize = font.sizes.some(s => {
      const px = parseFloat(s);
      return !isNaN(px) && px < 12;
    });
    if (hasSmallSize && isBodyFont) {
      issues.push({
        type: 'small-size',
        family: font.family,
        selector: font.selectors[0],
        message: `"${font.family}" used below 12px on body text — fails WCAG readability`,
        severity: 'error',
      });
    }

    // decorative/display on body
    if (isBodyFont && font.elementCount > 10) {
      // check via font name heuristic
      const isDecorative = DISPLAY_CATEGORIES.some(cat =>
        font.family.toLowerCase().includes(cat)
      );
      if (isDecorative) {
        issues.push({
          type: 'decorative-body',
          family: font.family,
          selector: font.selectors[0],
          message: `"${font.family}" appears to be decorative — avoid for body text`,
          severity: 'warning',
        });
      }
    }
  }

  return issues;
}
