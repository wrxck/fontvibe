export const layoutStyles = `
  .fv-trigger {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #1a1a2e;
    border: 2px solid #6c63ff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .fv-trigger:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 24px rgba(108, 99, 255, 0.5);
  }

  .fv-trigger svg {
    width: 24px;
    height: 24px;
    fill: #6c63ff;
  }

  .fv-panel {
    display: none;
    width: 380px;
    max-height: 520px;
    background: #1a1a2e;
    border: 1px solid #2d2d44;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    flex-direction: column;
  }

  .fv-panel.open {
    display: flex;
  }

  .fv-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #2d2d44;
    background: #16162a;
  }

  .fv-header h3 {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  .fv-close {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
    line-height: 1;
  }

  .fv-close:hover {
    color: #fff;
  }

  .fv-tabs {
    display: flex;
    border-bottom: 1px solid #2d2d44;
  }

  .fv-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 13px;
    border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .fv-tab.active {
    color: #6c63ff;
    border-bottom-color: #6c63ff;
  }

  .fv-tab:hover {
    color: #bbb;
  }

  .fv-body {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    max-height: 380px;
  }

  .fv-body::-webkit-scrollbar {
    width: 6px;
  }

  .fv-body::-webkit-scrollbar-thumb {
    background: #2d2d44;
    border-radius: 3px;
  }

  .fv-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 1px solid #2d2d44;
    background: #16162a;
  }

  .fv-footer-text {
    font-size: 11px;
    color: #555;
  }
`;
