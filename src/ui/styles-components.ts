export const componentStyles = `
  .fv-search-input {
    width: 100%;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    color: #e1e1e1;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    margin-bottom: 12px;
  }

  .fv-search-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .fv-search-input:focus {
    border-color: #FCE205;
  }

  .fv-font-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: background 0.15s;
  }

  .fv-font-item:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .fv-font-name {
    font-size: 13px;
    color: #e1e1e1;
    flex: 1;
  }

  .fv-font-meta {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    margin-left: 8px;
  }

  .fv-font-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .fv-btn {
    padding: 4px 10px;
    border-radius: 6px;
    border: none;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
  }

  .fv-btn-primary {
    background: #FCE205;
    color: #111;
  }

  .fv-btn-primary:hover {
    background: #e3cb04;
  }

  .fv-btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
  }

  .fv-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.14);
  }

  .fv-btn-danger {
    background: rgba(220, 38, 38, 0.15);
    color: #f87171;
  }

  .fv-btn-danger:hover {
    background: rgba(220, 38, 38, 0.25);
  }

  .fv-preview {
    display: none;
    padding: 12px;
    margin: 8px 0;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .fv-swap-badge {
    display: inline-block;
    padding: 2px 6px;
    background: rgba(252, 226, 5, 0.12);
    border-radius: 4px;
    font-size: 11px;
    color: #FCE205;
  }

  .fv-empty {
    text-align: center;
    color: rgba(255, 255, 255, 0.35);
    padding: 24px;
    font-size: 13px;
  }

  .fv-loading {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    padding: 16px;
  }

  .fv-export-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 20, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .fv-export-box {
    background: rgba(25, 25, 40, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 16px;
    width: 100%;
  }

  .fv-export-box textarea {
    width: 100%;
    height: 120px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    color: #e1e1e1;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    padding: 8px;
    resize: none;
    outline: none;
  }

  .fv-export-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    justify-content: flex-end;
  }

  .fv-pairing-card {
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .fv-pairing-fonts {
    font-size: 13px;
    color: #e1e1e1;
    margin-bottom: 4px;
  }

  .fv-pairing-desc {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }

  .fv-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fv-header-btn {
    height: 28px;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 1;
  }

  .fv-pick-btn.active {
    background: #FCE205;
    color: #111;
  }

  .fv-analytics-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .fv-analytics-bar-fill {
    height: 8px;
    background: #FCE205;
    border-radius: 4px;
    transition: width 0.3s;
  }

  .fv-analytics-bar-track {
    flex: 1;
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
  }

  .fv-analytics-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    min-width: 100px;
  }

  .fv-analytics-count {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    min-width: 40px;
    text-align: right;
  }

  .fv-analytics-section {
    margin-bottom: 16px;
  }

  .fv-analytics-section h4 {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .fv-unused-item {
    padding: 6px 12px;
    font-size: 12px;
    color: #f87171;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 6px;
    margin-bottom: 4px;
  }

  .fv-a11y-warning {
    display: inline-block;
    color: #fbbf24;
    font-size: 14px;
    margin-left: 4px;
    cursor: help;
  }

  .fv-a11y-error {
    display: inline-block;
    color: #f87171;
    font-size: 14px;
    margin-left: 4px;
    cursor: help;
  }

  .fv-a11y-issue {
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 4px;
    font-size: 12px;
  }

  .fv-a11y-issue.warning {
    background: rgba(251, 191, 36, 0.1);
    color: #fbbf24;
  }

  .fv-a11y-issue.error {
    background: rgba(220, 38, 38, 0.1);
    color: #f87171;
  }

  .fv-perf-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 4px;
    border-radius: 6px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.04);
  }

  .fv-perf-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .fv-perf-badge.green { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
  .fv-perf-badge.amber { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
  .fv-perf-badge.red { background: rgba(220, 38, 38, 0.15); color: #f87171; }

  .fv-variable-axis {
    padding: 8px 0;
  }

  .fv-variable-axis label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 4px;
  }

  .fv-variable-axis input[type="range"] {
    width: 100%;
    accent-color: #FCE205;
  }

  .fv-drop-zone {
    border: 2px dashed rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
    margin: 8px 0;
    transition: background 0.2s;
  }

  .fv-drop-zone.active {
    background: rgba(252, 226, 5, 0.08);
    border-color: #FCE205;
    color: #FCE205;
  }

  .fv-history-btn {
    height: 28px;
    padding: 0 8px;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .fv-history-btn:hover:not(:disabled) {
    color: #fff;
    border-color: #FCE205;
  }

  .fv-history-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .fv-theme-card {
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .fv-theme-name {
    font-size: 13px;
    color: #e1e1e1;
    margin-bottom: 4px;
  }

  .fv-theme-meta {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 8px;
  }

  .fv-scan-btn {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
  }

  .fv-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    text-align: center;
  }

  .fv-about-logo {
    margin-bottom: 12px;
    opacity: 0.9;
  }

  .fv-about-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  .fv-about-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.5;
    max-width: 280px;
    margin-bottom: 20px;
  }

  .fv-about-meta {
    width: 100%;
    max-width: 240px;
    margin-bottom: 20px;
  }

  .fv-about-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .fv-about-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }

  .fv-about-value {
    font-size: 12px;
    color: #e1e1e1;
  }

  .fv-about-links {
    display: flex;
    gap: 8px;
  }

  .fv-about-link {
    text-decoration: none;
    padding: 6px 16px;
  }

  .fv-selected-preview {
    padding: 16px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    margin-bottom: 12px;
    word-break: break-word;
  }

  .fv-selected-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 12px;
  }

  .fv-selected-label {
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
    margin-right: 12px;
  }

  .fv-selected-value {
    color: #e1e1e1;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fv-selected-code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .fv-selected-swatch {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    vertical-align: middle;
    margin-right: 4px;
  }

  .fv-selected-input {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: #e1e1e1;
    font-family: inherit;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
    text-align: right;
    min-width: 0;
    flex: 1;
    max-width: 160px;
  }

  .fv-selected-input:focus {
    border-color: #FCE205;
  }

  .fv-selected-input-short {
    max-width: 100px;
  }

  select.fv-selected-input {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    padding-right: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 6px center;
  }

  select.fv-selected-input option {
    background: #1a1a2e;
    color: #e1e1e1;
  }

  .fv-selected-color-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: flex-end;
    max-width: 160px;
  }

  .fv-selected-color {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    padding: 0;
    cursor: pointer;
    background: none;
    flex-shrink: 0;
  }

  .fv-selected-color::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  .fv-selected-color::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
  }

  .fv-selected-color-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

