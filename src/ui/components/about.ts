export function renderAboutTab(): string {
  return `
    <div class="fv-about">
      <div class="fv-about-logo">
        <svg viewBox="0 0 24 24" width="48" height="48"><path fill="#FCE205" d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/></svg>
      </div>
      <h4 class="fv-about-title">FontVibe</h4>
      <p class="fv-about-desc">
        Universal dev-tool for font management — detect, search, swap, pair, and export fonts.
      </p>
      <div class="fv-about-meta">
        <div class="fv-about-row">
          <span class="fv-about-label">Author</span>
          <span class="fv-about-value">Matt Hesketh</span>
        </div>
        <div class="fv-about-row">
          <span class="fv-about-label">License</span>
          <span class="fv-about-value">MIT</span>
        </div>
      </div>
      <div class="fv-about-links">
        <a class="fv-btn fv-btn-secondary fv-about-link" href="https://github.com/wrxck/fontvibe" target="_blank" rel="noopener">
          GitHub
        </a>
        <a class="fv-btn fv-btn-secondary fv-about-link" href="https://www.npmjs.com/package/fontvibe" target="_blank" rel="noopener">
          npm
        </a>
      </div>
    </div>
  `;
}
