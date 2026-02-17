import type { PanelPosition } from '../core/types.js';
import { layoutStyles } from './styles-layout.js';
import { componentStyles } from './styles-components.js';

export function getPanelStyles(position: PanelPosition): string {
  const posMap: Record<PanelPosition, string> = {
    'bottom-right': 'bottom: 16px; right: 16px;',
    'bottom-left': 'bottom: 16px; left: 16px;',
    'top-right': 'top: 16px; right: 16px;',
    'top-left': 'top: 16px; left: 16px;',
  };

  return `
    :host {
      all: initial;
      position: fixed;
      ${posMap[position]}
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      color: #e1e1e1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    ${layoutStyles}
    ${componentStyles}
  `;
}
