import type { VariableAxis, VariableFontInfo } from './types.js';

const KNOWN_AXES: Record<string, string> = {
  wght: 'Weight',
  wdth: 'Width',
  slnt: 'Slant',
  opsz: 'Optical Size',
  ital: 'Italic',
};

const VARIATION_ATTR = 'data-fv-variation';

export function detectVariableAxes(): VariableFontInfo[] {
  const results: VariableFontInfo[] = [];

  try {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (!(rule instanceof CSSFontFaceRule)) continue;

          const family = rule.style.getPropertyValue('font-family').replace(/["']/g, '').trim();
          if (!family) continue;

          const axes: VariableAxis[] = [];

          // detect weight range
          const weight = rule.style.getPropertyValue('font-weight');
          if (weight && weight.includes(' ')) {
            const [min, max] = weight.split(' ').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
              axes.push({ tag: 'wght', name: 'Weight', min, max, default: 400 });
            }
          }

          // detect width range
          const stretch = rule.style.getPropertyValue('font-stretch');
          if (stretch && stretch.includes('%')) {
            const parts = stretch.replace(/%/g, '').split(' ').map(Number);
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
              axes.push({ tag: 'wdth', name: 'Width', min: parts[0], max: parts[1], default: 100 });
            }
          }

          // detect slant range
          const style = rule.style.getPropertyValue('font-style');
          if (style && style.startsWith('oblique') && style.includes(' ')) {
            const nums = style.match(/-?\d+/g);
            if (nums && nums.length >= 2) {
              axes.push({ tag: 'slnt', name: 'Slant', min: Number(nums[0]), max: Number(nums[1]), default: 0 });
            }
          }

          if (axes.length > 0) {
            results.push({ family, axes });
          }
        }
      } catch {
        // cross-origin
      }
    }
  } catch {
    // no stylesheets
  }

  return results;
}

export function applyVariationSettings(family: string, settings: Record<string, number>): void {
  const value = Object.entries(settings)
    .map(([tag, val]) => `"${tag}" ${val}`)
    .join(', ');

  const id = `fv-var-${family.replace(/\s/g, '-')}`;
  let style = document.querySelector<HTMLStyleElement>(`style[${VARIATION_ATTR}="${id}"]`);

  if (!style) {
    style = document.createElement('style');
    style.setAttribute(VARIATION_ATTR, id);
    document.head.appendChild(style);
  }

  style.textContent = `* { font-variation-settings: ${value} !important; }`;
}

export function getAxisName(tag: string): string {
  return KNOWN_AXES[tag] || tag;
}
