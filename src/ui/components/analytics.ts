import type { AnalyticsReport, A11yIssue, FontPerfData } from '../../core/types.js';

export function renderAnalyticsTab(
  report: AnalyticsReport | null,
  a11yIssues: A11yIssue[],
  perfData: FontPerfData[],
): string {
  if (!report) {
    return `
      <button class="fv-btn fv-btn-primary fv-scan-btn" data-fv-scan>Scan Page Fonts</button>
      <div class="fv-empty">click scan to analyse font usage</div>
    `;
  }

  const maxCount = Math.max(...report.fonts.map(f => f.elementCount), 1);

  const usageBars = report.fonts.map(f => {
    const pct = Math.round((f.elementCount / maxCount) * 100);
    return `
      <div class="fv-analytics-bar">
        <div class="fv-analytics-label">${f.family}</div>
        <div class="fv-analytics-bar-track">
          <div class="fv-analytics-bar-fill" style="width: ${pct}%"></div>
        </div>
        <div class="fv-analytics-count">${f.elementCount}</div>
      </div>
    `;
  }).join('');

  const unusedHtml = report.unusedFontFaces.length
    ? report.unusedFontFaces.map(f => `<div class="fv-unused-item">${f} (declared but unused)</div>`).join('')
    : '<div class="fv-empty" style="padding: 8px;">none</div>';

  const a11yHtml = a11yIssues.length
    ? a11yIssues.map(issue => `
        <div class="fv-a11y-issue ${issue.severity}">
          ${issue.severity === 'error' ? '&#9888;' : '&#9432;'} ${issue.message}
        </div>
      `).join('')
    : '<div class="fv-empty" style="padding: 8px;">no issues</div>';

  const perfHtml = perfData.length
    ? perfData.map(p => `
        <div class="fv-perf-item">
          <span>${p.family}</span>
          <span>${p.variantCount} variants · ~${Math.round(p.estimatedSize)}KB</span>
          <span class="fv-perf-badge ${p.rating}">${p.rating}</span>
        </div>
      `).join('')
    : '<div class="fv-empty" style="padding: 8px;">no external fonts</div>';

  return `
    <button class="fv-btn fv-btn-secondary fv-scan-btn" data-fv-scan>Re-scan</button>
    <div class="fv-analytics-section">
      <h4>Font Usage (${report.totalElements} elements)</h4>
      ${usageBars}
    </div>
    <div class="fv-analytics-section">
      <h4>Unused @font-face</h4>
      ${unusedHtml}
    </div>
    <div class="fv-analytics-section">
      <h4>Accessibility</h4>
      ${a11yHtml}
    </div>
    <div class="fv-analytics-section">
      <h4>Performance</h4>
      ${perfHtml}
    </div>
  `;
}
