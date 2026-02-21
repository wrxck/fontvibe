import type { PickedElementInfo } from '../../core/types.js';

export function renderSelectedTab(info: PickedElementInfo | null): string {
  if (!info) {
    return `<div class="fv-empty">Click "Pick" in the header, then click any element on the page to inspect its font properties.</div>`;
  }

  const preview = info.textContent.length > 80
    ? info.textContent.slice(0, 80) + '...'
    : info.textContent;

  const families = info.fontFamily.split(',').map(f => f.trim().replace(/["']/g, ''));
  const primary = families[0] || 'unknown';

  const sel = escapeAttr(info.selector);

  const weightOptions = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    .map(w => `<option value="${w}"${info.fontWeight === w ? ' selected' : ''}>${w}</option>`)
    .join('');

  const styleOptions = ['normal', 'italic', 'oblique']
    .map(s => `<option value="${s}"${info.fontStyle === s ? ' selected' : ''}>${s}</option>`)
    .join('');

  return `
    <div class="fv-selected-preview" data-fv-selected-preview style="font-family: ${info.fontFamily}; font-size: ${info.fontSize}; font-weight: ${info.fontWeight}; font-style: ${info.fontStyle}; line-height: ${info.lineHeight}; letter-spacing: ${info.letterSpacing}; color: ${info.color};">
      ${escapeHtml(preview)}
    </div>

    <div class="fv-selected-row fv-selected-readonly">
      <span class="fv-selected-label">Element</span>
      <span class="fv-selected-value">&lt;${info.tagName.toLowerCase()}&gt;</span>
    </div>
    <div class="fv-selected-row fv-selected-readonly">
      <span class="fv-selected-label">Selector</span>
      <span class="fv-selected-value"><code class="fv-selected-code">${escapeHtml(info.selector)}</code></span>
    </div>

    <div class="fv-selected-row">
      <span class="fv-selected-label">Font family</span>
      <input class="fv-selected-input" type="text" value="${escapeAttr(primary)}" data-fv-edit="fontFamily" data-fv-selector="${sel}" />
    </div>
    <div class="fv-selected-row">
      <span class="fv-selected-label">Size</span>
      <input class="fv-selected-input fv-selected-input-short" type="text" value="${escapeAttr(info.fontSize)}" data-fv-edit="fontSize" data-fv-selector="${sel}" />
    </div>
    <div class="fv-selected-row">
      <span class="fv-selected-label">Weight</span>
      <select class="fv-selected-input fv-selected-input-short" data-fv-edit="fontWeight" data-fv-selector="${sel}">${weightOptions}</select>
    </div>
    <div class="fv-selected-row">
      <span class="fv-selected-label">Style</span>
      <select class="fv-selected-input fv-selected-input-short" data-fv-edit="fontStyle" data-fv-selector="${sel}">${styleOptions}</select>
    </div>
    <div class="fv-selected-row">
      <span class="fv-selected-label">Line height</span>
      <input class="fv-selected-input fv-selected-input-short" type="text" value="${escapeAttr(info.lineHeight)}" data-fv-edit="lineHeight" data-fv-selector="${sel}" />
    </div>
    <div class="fv-selected-row">
      <span class="fv-selected-label">Letter spacing</span>
      <input class="fv-selected-input fv-selected-input-short" type="text" value="${escapeAttr(info.letterSpacing)}" data-fv-edit="letterSpacing" data-fv-selector="${sel}" />
    </div>
    <div class="fv-selected-row">
      <span class="fv-selected-label">Color</span>
      <div class="fv-selected-color-wrap">
        <input class="fv-selected-color" type="color" value="${rgbToHex(info.color)}" data-fv-edit="color" data-fv-selector="${sel}" />
        <span class="fv-selected-color-label">${info.color}</span>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return '#000000';
  const hex = match.slice(0, 3).map(n => Number(n).toString(16).padStart(2, '0')).join('');
  return `#${hex}`;
}
