import type { DetectedFont, FontSwap } from '../../core/types.js';

export function renderFontList(
  fonts: DetectedFont[],
  swaps: FontSwap[],
  onSwap: (family: string, selectors: string[]) => void,
  onRevert: (swapId: string) => void,
): string {
  if (!fonts.length) {
    return '<div class="fv-empty">no fonts detected yet</div>';
  }

  return fonts.map(font => {
    const activeSwap = swaps.find(s => s.originalFamily === font.family);
    const swapBadge = activeSwap
      ? `<span class="fv-swap-badge">${activeSwap.newFamily}</span>`
      : '';

    const actions = activeSwap
      ? `<button class="fv-btn fv-btn-danger" data-revert="${activeSwap.id}">Revert</button>`
      : `<button class="fv-btn fv-btn-secondary" data-swap-from="${font.family}" data-selectors="${font.selectors.join(',')}">Swap</button>`;

    return `
      <div class="fv-font-item">
        <div>
          <div class="fv-font-name">${font.family} ${swapBadge}</div>
          <div class="fv-font-meta">${font.elementCount} elements · ${font.source}</div>
        </div>
        <div class="fv-font-actions">${actions}</div>
      </div>
    `;
  }).join('');
}

export function bindFontListEvents(
  container: HTMLElement,
  onSwap: (family: string, selectors: string[]) => void,
  onRevert: (swapId: string) => void,
): void {
  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const revertId = target.dataset.revert;
    if (revertId) {
      onRevert(revertId);
      return;
    }

    const swapFrom = target.dataset.swapFrom;
    if (swapFrom) {
      const selectors = (target.dataset.selectors || '').split(',').filter(Boolean);
      onSwap(swapFrom, selectors);
    }
  });
}
