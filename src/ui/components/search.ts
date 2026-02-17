import type { GoogleFont } from '../../core/types.js';

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
    <div class="fv-font-item">
      <div>
        <div class="fv-font-name">${font.family}</div>
        <div class="fv-font-meta">${font.category} · ${font.variants.length} variants</div>
      </div>
      <div class="fv-font-actions">
        <button class="fv-btn fv-btn-primary" data-apply-font="${font.family}">Apply</button>
      </div>
    </div>
  `).join('');

  return `${input}${list}`;
}

export function bindSearchEvents(
  container: HTMLElement,
  onSearch: (query: string) => void,
  onApply: (family: string) => void,
): void {
  let debounceTimer: ReturnType<typeof setTimeout>;

  container.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.dataset.fvSearch !== undefined) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => onSearch(target.value), 300);
    }
  });

  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const fontFamily = target.dataset.applyFont;
    if (fontFamily) {
      onApply(fontFamily);
    }
  });
}
