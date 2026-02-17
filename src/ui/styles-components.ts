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
`;
