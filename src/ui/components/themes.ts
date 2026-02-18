import type { FontTheme } from '../../core/types.js';

export function renderThemesTab(themes: FontTheme[]): string {
  const saveBtn = `<button class="fv-btn fv-btn-primary fv-scan-btn" data-fv-save-theme>Save Current as Theme</button>`;

  if (!themes.length) {
    return `${saveBtn}<div class="fv-empty">no saved themes</div>`;
  }

  const cards = themes.map(theme => {
    const date = new Date(theme.createdAt).toLocaleDateString();
    const swapCount = theme.swaps.length;
    return `
      <div class="fv-theme-card">
        <div class="fv-theme-name">${theme.name}</div>
        <div class="fv-theme-meta">${swapCount} swap${swapCount !== 1 ? 's' : ''} · ${date}</div>
        <div class="fv-font-actions">
          <button class="fv-btn fv-btn-primary" data-fv-apply-theme="${theme.id}">Apply</button>
          <button class="fv-btn fv-btn-danger" data-fv-delete-theme="${theme.id}">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  return `${saveBtn}${cards}`;
}
