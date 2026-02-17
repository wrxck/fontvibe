import type { FontSwap } from '../../core/types.js';
import { googleFontUrl } from '../../core/google-fonts.js';

export function generateExportCss(swaps: FontSwap[]): string {
  if (!swaps.length) return '/* no active font swaps */';

  const imports = [...new Set(swaps.map(s => s.newFamily))]
    .map(family => `@import url('${googleFontUrl(family)}');`)
    .join('\n');

  const rules = swaps.map(swap => {
    const selectors = swap.selectors.join(', ');
    const weight = swap.weight ? `\n  font-weight: ${swap.weight};` : '';
    return `${selectors} {\n  font-family: "${swap.newFamily}", sans-serif;${weight}\n}`;
  }).join('\n\n');

  return `${imports}\n\n${rules}`;
}

export function renderExportDialog(swaps: FontSwap[]): string {
  const css = generateExportCss(swaps);
  return `
    <div class="fv-export-overlay" data-fv-export-overlay>
      <div class="fv-export-box">
        <h3 style="color: #fff; font-size: 14px; margin-bottom: 12px;">Export CSS</h3>
        <textarea readonly>${css}</textarea>
        <div class="fv-export-actions">
          <button class="fv-btn fv-btn-secondary" data-fv-export-close>Close</button>
          <button class="fv-btn fv-btn-primary" data-fv-export-copy>Copy</button>
        </div>
      </div>
    </div>
  `;
}

export function bindExportEvents(
  container: HTMLElement,
  onClose: () => void,
): void {
  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.dataset.fvExportClose !== undefined || target.dataset.fvExportOverlay !== undefined) {
      onClose();
      return;
    }

    if (target.dataset.fvExportCopy !== undefined) {
      const textarea = container.querySelector('textarea');
      if (textarea) {
        navigator.clipboard.writeText(textarea.value);
        target.textContent = 'Copied!';
        setTimeout(() => { target.textContent = 'Copy'; }, 1500);
      }
    }
  });
}
