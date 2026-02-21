import type { DetectedFont, FontSwap, VariableFontInfo } from '../../core/types.js';

export function renderFontList(
  fonts: DetectedFont[],
  swaps: FontSwap[],
  variableFonts?: VariableFontInfo[],
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

    const varInfo = variableFonts?.find(v => v.family === font.family);
    const axisHtml = varInfo ? `
      <details style="margin-top: 4px;">
        <summary style="font-size: 11px; color: #FCE205; cursor: pointer;">variable axes</summary>
        ${varInfo.axes.map(axis => `
          <div class="fv-variable-axis">
            <label>
              <span>${axis.name} (${axis.tag})</span>
              <span data-fv-axis-value="${font.family}-${axis.tag}">${axis.default}</span>
            </label>
            <input type="range"
              min="${axis.min}" max="${axis.max}" value="${axis.default}" step="1"
              data-fv-axis-family="${font.family}"
              data-fv-axis-tag="${axis.tag}" />
          </div>
        `).join('')}
      </details>
    ` : '';

    return `
      <div class="fv-font-item">
        <div style="flex: 1;">
          <div class="fv-font-name">${font.family} ${swapBadge}</div>
          <div class="fv-font-meta">${font.elementCount} elements · ${font.source}</div>
          ${axisHtml}
        </div>
        <div class="fv-font-actions">${actions}</div>
      </div>
    `;
  }).join('');
}
