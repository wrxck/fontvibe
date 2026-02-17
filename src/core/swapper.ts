import type { FontSwap } from './types.js';
import { googleFontUrl } from './google-fonts.js';

const SWAP_ATTR = 'data-fontvibe-swap';
const LINK_ATTR = 'data-fontvibe-link';

let swapCounter = 0;

export function applySwap(
  originalFamily: string,
  newFamily: string,
  selectors?: string[],
  weight?: string,
): FontSwap {
  const id = `fv-swap-${++swapCounter}`;

  // load the google font
  const existingLink = document.querySelector(`link[${LINK_ATTR}="${newFamily}"]`);
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = googleFontUrl(newFamily);
    link.setAttribute(LINK_ATTR, newFamily);
    document.head.appendChild(link);
  }

  // build css rules
  const targets = selectors?.length ? selectors : ['*'];
  const weightRule = weight ? `font-weight: ${weight} !important;` : '';
  const css = targets
    .map(sel => `${sel} { font-family: "${newFamily}", sans-serif !important; ${weightRule} }`)
    .join('\n');

  const style = document.createElement('style');
  style.setAttribute(SWAP_ATTR, id);
  style.textContent = css;
  document.head.appendChild(style);

  return {
    id,
    originalFamily,
    newFamily,
    selectors: targets,
    weight,
    timestamp: Date.now(),
  };
}

export function revertSwap(swapId: string): boolean {
  const style = document.querySelector(`style[${SWAP_ATTR}="${swapId}"]`);
  if (!style) return false;
  style.remove();

  // keep font link loaded — minimal overhead
  return true;
}

export function revertAllSwaps(): number {
  const styles = document.querySelectorAll(`style[${SWAP_ATTR}]`);
  const count = styles.length;
  styles.forEach(s => s.remove());

  // also clean up font links
  document.querySelectorAll(`link[${LINK_ATTR}]`).forEach(l => l.remove());

  return count;
}

export function getActiveSwapElements(): HTMLStyleElement[] {
  return Array.from(document.querySelectorAll<HTMLStyleElement>(`style[${SWAP_ATTR}]`));
}
