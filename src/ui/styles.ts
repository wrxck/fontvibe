import type { PanelPosition } from '../core/types.js';
import { layoutStyles } from './styles-layout.js';
import { componentStyles } from './styles-components.js';

export function getPanelStyles(position: PanelPosition): string {
  const posMap: Record<PanelPosition, string> = {
    'bottom-right': 'bottom: 16px; right: 16px; flex-direction: column-reverse; align-items: flex-end;',
    'bottom-left': 'bottom: 16px; left: 16px; flex-direction: column-reverse; align-items: flex-start;',
    'top-right': 'top: 16px; right: 16px; flex-direction: column; align-items: flex-end;',
    'top-left': 'top: 16px; left: 16px; flex-direction: column; align-items: flex-start;',
  };

  return `
    :host {
      all: initial;
      position: fixed;
      ${posMap[position]}
      display: flex;
      gap: 8px;
      z-index: 2147483647;
      font-family: 'IBM Plex Mono', monospace;
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
