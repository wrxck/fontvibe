export const layoutStyles = `
  .fv-trigger {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(15, 15, 25, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .fv-trigger:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  }

  .fv-trigger svg {
    width: 24px;
    height: 24px;
    fill: #e1e1e1;
  }

  .fv-panel {
    display: none;
    width: 380px;
    max-height: 520px;
    background: rgba(15, 15, 25, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
  }

  .fv-header h3 {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  .fv-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
    line-height: 1;
  }

  .fv-close:hover {
    color: #fff;
  }

  .fv-tabs-wrap {
    position: relative;
    background: rgba(0, 0, 0, 0.3);
  }

  .fv-tabs-arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 28px;
    display: none;
    align-items: center;
    justify-content: center;
    background: #0f0f19;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    padding: 0;
    font-family: inherit;
    line-height: 1;
    transition: color 0.15s;
  }

  .fv-tabs-arrow:hover {
    color: #FCE205;
  }

  .fv-tabs-arrow-left {
    left: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  .fv-tabs-arrow-right {
    right: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  .fv-tabs-arrow.visible {
    display: flex;
  }

  .fv-tabs {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: none;
    scrollbar-width: none;
  }

  .fv-tabs::-webkit-scrollbar {
    display: none;
  }

  .fv-tab {
    flex: 0 0 auto;
    padding: 10px 16px;
    text-align: center;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .fv-tab.active {
    color: #FCE205;
    border-bottom-color: #FCE205;
  }

  .fv-tab:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .fv-body {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    min-height: 380px;
    max-height: 380px;
  }

  .fv-body::-webkit-scrollbar {
    width: 6px;
  }

  .fv-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 3px;
  }

  .fv-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
  }

  .fv-footer-text {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }
`;
