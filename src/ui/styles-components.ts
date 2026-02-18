export const componentStyles = `
  .fv-search-input {
    width: 100%;
    padding: 8px 12px;
    background: #0f0f23;
    border: 1px solid #2d2d44;
    border-radius: 8px;
    color: #e1e1e1;
    font-size: 13px;
    outline: none;
    margin-bottom: 12px;
  }

  .fv-search-input:focus {
    border-color: #6c63ff;
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
    background: #22223a;
  }

  .fv-font-name {
    font-size: 13px;
    color: #e1e1e1;
    flex: 1;
  }

  .fv-font-meta {
    font-size: 11px;
    color: #666;
    margin-left: 8px;
  }

  .fv-font-actions {
    display: flex;
    gap: 4px;
    margin-left: 8px;
  }

  .fv-btn {
    padding: 4px 10px;
    border-radius: 6px;
    border: none;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .fv-btn-primary {
    background: #6c63ff;
    color: #fff;
  }

  .fv-btn-primary:hover {
    background: #5a52e0;
  }

  .fv-btn-secondary {
    background: #2d2d44;
    color: #bbb;
  }

  .fv-btn-secondary:hover {
    background: #3d3d54;
  }

  .fv-btn-danger {
    background: #44222d;
    color: #ff6b6b;
  }

  .fv-btn-danger:hover {
    background: #55333e;
  }

  .fv-preview {
    display: none;
    padding: 12px;
    margin: 8px 0;
    background: #0f0f23;
    border-radius: 8px;
    border: 1px solid #2d2d44;
  }

  .fv-swap-badge {
    display: inline-block;
    padding: 2px 6px;
    background: #2a2a4a;
    border-radius: 4px;
    font-size: 11px;
    color: #6c63ff;
  }

  .fv-empty {
    text-align: center;
    color: #666;
    padding: 24px;
    font-size: 13px;
  }

  .fv-loading {
    text-align: center;
    color: #888;
    padding: 16px;
  }

  .fv-export-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .fv-export-box {
    background: #1a1a2e;
    border: 1px solid #2d2d44;
    border-radius: 12px;
    padding: 16px;
    width: 100%;
  }

  .fv-export-box textarea {
    width: 100%;
    height: 120px;
    background: #0f0f23;
    border: 1px solid #2d2d44;
    border-radius: 8px;
    color: #e1e1e1;
    font-family: monospace;
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
    background: #22223a;
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
    color: #888;
  }

  .fv-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fv-pick-btn.active {
    background: #6c63ff;
    color: #fff;
  }

  .fv-analytics-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .fv-analytics-bar-fill {
    height: 8px;
    background: #6c63ff;
    border-radius: 4px;
    transition: width 0.3s;
  }

  .fv-analytics-bar-track {
    flex: 1;
    height: 8px;
    background: #2d2d44;
    border-radius: 4px;
    overflow: hidden;
  }

  .fv-analytics-label {
    font-size: 12px;
    color: #bbb;
    min-width: 100px;
  }

  .fv-analytics-count {
    font-size: 11px;
    color: #666;
    min-width: 40px;
    text-align: right;
  }

  .fv-analytics-section {
    margin-bottom: 16px;
  }

  .fv-analytics-section h4 {
    font-size: 12px;
    color: #888;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .fv-unused-item {
    padding: 6px 12px;
    font-size: 12px;
    color: #ff6b6b;
    background: #2a1a1e;
    border-radius: 6px;
    margin-bottom: 4px;
  }

  .fv-a11y-warning {
    display: inline-block;
    color: #ffb347;
    font-size: 14px;
    margin-left: 4px;
    cursor: help;
  }

  .fv-a11y-error {
    display: inline-block;
    color: #ff6b6b;
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
    background: #2a2a1e;
    color: #ffb347;
  }

  .fv-a11y-issue.error {
    background: #2a1a1e;
    color: #ff6b6b;
  }

  .fv-perf-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 4px;
    border-radius: 6px;
    font-size: 12px;
    background: #22223a;
  }

  .fv-perf-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .fv-perf-badge.green { background: #1a3a2a; color: #4caf50; }
  .fv-perf-badge.amber { background: #3a3a1a; color: #ffb347; }
  .fv-perf-badge.red { background: #3a1a1a; color: #ff6b6b; }

  .fv-variable-axis {
    padding: 8px 0;
  }

  .fv-variable-axis label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #bbb;
    margin-bottom: 4px;
  }

  .fv-variable-axis input[type="range"] {
    width: 100%;
    accent-color: #6c63ff;
  }

  .fv-drop-zone {
    border: 2px dashed #6c63ff;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    color: #888;
    font-size: 13px;
    margin: 8px 0;
    transition: background 0.2s;
  }

  .fv-drop-zone.active {
    background: rgba(108, 99, 255, 0.1);
    color: #6c63ff;
  }

  .fv-history-btn {
    padding: 4px 8px;
    background: none;
    border: 1px solid #2d2d44;
    border-radius: 4px;
    color: #888;
    cursor: pointer;
    font-size: 14px;
  }

  .fv-history-btn:hover:not(:disabled) {
    color: #e1e1e1;
    border-color: #6c63ff;
  }

  .fv-history-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .fv-theme-card {
    padding: 12px;
    background: #22223a;
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
    color: #888;
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
    color: #888;
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
    border-bottom: 1px solid #2d2d44;
  }

  .fv-about-label {
    font-size: 12px;
    color: #666;
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
`;
