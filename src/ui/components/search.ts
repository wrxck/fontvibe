import type { GoogleFont } from '../../core/types.js';
import { renderPreview } from './preview.js';
import { googleFontUrl } from '../../core/google-fonts.js';

export function renderSearchTab(
  query: string,
  results: GoogleFont[],
  loading: boolean,
): string {
  const input = `<input class="fv-search-input" type="text" placeholder="Search Google Fonts..." value="${query}" data-fv-search />`;

  if (loading) {
    return `${input}<div class="fv-loading">searching...</div>`;
  }

  if (!query) {
    return `${input}<div class="fv-empty">type to search google fonts</div>`;
  }

  if (!results.length) {
    return `${input}<div class="fv-empty">no fonts found for "${query}"</div>`;
  }

  const list = results.slice(0, 30).map(font => `
    <link rel="preload" href="${googleFontUrl(font.family)}" as="style" />
    <div class="fv-font-item" data-hover-preview="${font.family}">
      <div>
        <div class="fv-font-name">${font.family}</div>
        <div class="fv-font-meta">${font.category} · ${font.variants.length} variants</div>
      </div>
      <div class="fv-font-actions">
        <button class="fv-btn fv-btn-primary" data-apply-font="${font.family}">Apply</button>
      </div>
    </div>
    ${renderPreview(font.family)}
  `).join('');

  return `${input}${list}`;
}

