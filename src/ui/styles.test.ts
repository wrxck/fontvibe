import { describe, it, expect } from 'vitest';
import { getPanelStyles } from './styles.js';
import type { PanelPosition } from '../core/types.js';

describe('getPanelStyles', () => {
  const positions: { pos: PanelPosition; expected: Record<string, string> }[] = [
    {
      pos: 'bottom-right',
      expected: {
        'bottom: 16px': 'bottom: 16px',
        'right: 16px': 'right: 16px',
        'flex-direction: column-reverse': 'flex-direction: column-reverse',
        'align-items: flex-end': 'align-items: flex-end',
      },
    },
    {
      pos: 'bottom-left',
      expected: {
        'bottom: 16px': 'bottom: 16px',
        'left: 16px': 'left: 16px',
        'flex-direction: column-reverse': 'flex-direction: column-reverse',
        'align-items: flex-start': 'align-items: flex-start',
      },
    },
    {
      pos: 'top-right',
      expected: {
        'top: 16px': 'top: 16px',
        'right: 16px': 'right: 16px',
        'flex-direction: column': 'flex-direction: column',
        'align-items: flex-end': 'align-items: flex-end',
      },
    },
    {
      pos: 'top-left',
      expected: {
        'top: 16px': 'top: 16px',
        'left: 16px': 'left: 16px',
        'flex-direction: column': 'flex-direction: column',
        'align-items: flex-start': 'align-items: flex-start',
      },
    },
  ];

  for (const { pos, expected } of positions) {
    it(`${pos} generates correct CSS properties`, () => {
      const css = getPanelStyles(pos);
      for (const snippet of Object.values(expected)) {
        expect(css).toContain(snippet);
      }
    });
  }

  it('all positions include position: fixed', () => {
    for (const pos of ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as PanelPosition[]) {
      expect(getPanelStyles(pos)).toContain('position: fixed');
    }
  });

  it('all positions include display: flex', () => {
    for (const pos of ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as PanelPosition[]) {
      expect(getPanelStyles(pos)).toContain('display: flex');
    }
  });

  it('all positions include IBM Plex Mono font', () => {
    for (const pos of ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as PanelPosition[]) {
      expect(getPanelStyles(pos)).toContain('IBM Plex Mono');
    }
  });

  it('output includes layoutStyles and componentStyles', () => {
    const css = getPanelStyles('bottom-right');
    // layoutStyles contains .fv-trigger, componentStyles contains component-level selectors
    expect(css).toContain('.fv-trigger');
    expect(css).toContain('.fv-panel');
  });
});
