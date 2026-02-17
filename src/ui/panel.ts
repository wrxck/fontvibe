import type { FontVibeConfig, FontVibeState } from '../core/types.js';
import { detectFonts } from '../core/detector.js';
import { searchGoogleFonts } from '../core/google-fonts.js';
import { applySwap, revertSwap, revertAllSwaps } from '../core/swapper.js';
import { suggestPairings } from '../core/pairings.js';
import { saveSwaps, loadSwaps } from '../core/storage.js';
import { getState, setState, subscribe } from './state.js';
import { getPanelStyles } from './styles.js';
import { renderFontList, bindFontListEvents } from './components/font-list.js';
import { renderSearchTab, bindSearchEvents } from './components/search.js';
import { renderExportDialog, bindExportEvents } from './components/export-dialog.js';

const FONT_ICON_SVG = `<svg viewBox="0 0 24 24"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/></svg>`;

export function createPanel(config: FontVibeConfig): {
  host: HTMLElement;
  destroy: () => void;
} {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = getPanelStyles(config.position || 'bottom-right');
  shadow.appendChild(style);

  const trigger = document.createElement('button');
  trigger.className = 'fv-trigger';
  trigger.innerHTML = FONT_ICON_SVG;
  trigger.title = 'FontVibe';
  shadow.appendChild(trigger);

  const panel = document.createElement('div');
  panel.className = 'fv-panel';
  panel.innerHTML = buildPanelHtml(getState());
  shadow.appendChild(panel);

  // restore persisted swaps
  if (config.persistSwaps) {
    const saved = loadSwaps();
    if (saved.length) {
      saved.forEach(s => applySwap(s.originalFamily, s.newFamily, s.selectors, s.weight));
      setState({ activeSwaps: saved });
    }
  }

  // detect fonts on mount
  setState({
    detectedFonts: detectFonts(),
    activeTab: config.defaultTab || 'detected',
  });

  const unsubscribe = subscribe((state) => {
    panel.innerHTML = buildPanelHtml(state);
    panel.className = state.panelOpen ? 'fv-panel open' : 'fv-panel';
    if (config.persistSwaps) saveSwaps(state.activeSwaps);
  });

  trigger.addEventListener('click', () => {
    setState({ panelOpen: !getState().panelOpen });
  });

  bindPanelEvents(shadow, config);

  return {
    host,
    destroy: () => {
      unsubscribe();
      host.remove();
    },
  };
}

function buildPanelHtml(state: FontVibeState): string {
  const detectedActive = state.activeTab === 'detected' ? 'active' : '';
  const searchActive = state.activeTab === 'search' ? 'active' : '';
  const pairingsActive = state.activeTab === 'pairings' ? 'active' : '';

  let bodyContent: string;
  if (state.activeTab === 'detected') {
    bodyContent = renderFontList(state.detectedFonts, state.activeSwaps, () => {}, () => {});
  } else if (state.activeTab === 'search') {
    bodyContent = renderSearchTab(state.searchQuery, state.searchResults, state.loading);
  } else {
    bodyContent = renderPairingsTab();
  }

  const swapCount = state.activeSwaps.length;
  const footerActions = swapCount > 0
    ? `<button class="fv-btn fv-btn-secondary" data-fv-export>Export</button>
       <button class="fv-btn fv-btn-danger" data-fv-revert-all>Revert all</button>`
    : '';

  return `
    <div class="fv-header">
      <h3>FontVibe</h3>
      <button class="fv-close" data-fv-close>&times;</button>
    </div>
    <div class="fv-tabs">
      <button class="fv-tab ${detectedActive}" data-fv-tab="detected">Detected</button>
      <button class="fv-tab ${searchActive}" data-fv-tab="search">Search</button>
      <button class="fv-tab ${pairingsActive}" data-fv-tab="pairings">Pairings</button>
    </div>
    <div class="fv-body" data-fv-body>${bodyContent}</div>
    <div class="fv-footer">
      <span class="fv-footer-text">${swapCount} swap${swapCount !== 1 ? 's' : ''} active</span>
      <div class="fv-font-actions">${footerActions}</div>
    </div>
  `;
}

function renderPairingsTab(): string {
  const pairings = suggestPairings();
  return pairings.map(p => `
    <div class="fv-pairing-card">
      <div class="fv-pairing-fonts">${p.heading} + ${p.body}</div>
      <div class="fv-pairing-desc">${p.description}</div>
      <div class="fv-font-actions" style="margin-top: 8px;">
        <button class="fv-btn fv-btn-primary" data-apply-pairing-h="${p.heading}" data-apply-pairing-b="${p.body}">Apply</button>
      </div>
    </div>
  `).join('');
}

function bindPanelEvents(shadow: ShadowRoot, config: FontVibeConfig): void {
  shadow.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.dataset.fvClose !== undefined) {
      setState({ panelOpen: false });
      return;
    }

    if (target.dataset.fvTab) {
      setState({ activeTab: target.dataset.fvTab as FontVibeState['activeTab'] });
      return;
    }

    if (target.dataset.fvRevertAll !== undefined) {
      revertAllSwaps();
      setState({ activeSwaps: [] });
      return;
    }

    if (target.dataset.fvExport !== undefined) {
      const body = shadow.querySelector('[data-fv-body]');
      if (body) {
        body.innerHTML += renderExportDialog(getState().activeSwaps);
        bindExportEvents(body as HTMLElement, () => {
          const overlay = shadow.querySelector('.fv-export-overlay');
          overlay?.remove();
        });
      }
      return;
    }

    // font list revert
    const revertId = target.dataset.revert;
    if (revertId) {
      revertSwap(revertId);
      setState({ activeSwaps: getState().activeSwaps.filter(s => s.id !== revertId) });
      return;
    }

    // font list swap — opens search tab targeting that font
    const swapFrom = target.dataset.swapFrom;
    if (swapFrom) {
      setState({
        activeTab: 'search',
        searchQuery: '',
        searchResults: [],
      });
      // store the swap target for the next apply
      shadow.host.setAttribute('data-fv-swap-target', swapFrom);
      const selectors = (target.dataset.selectors || '').split(',').filter(Boolean);
      shadow.host.setAttribute('data-fv-swap-selectors', selectors.join(','));
      return;
    }

    // apply font from search
    const applyFont = target.dataset.applyFont;
    if (applyFont) {
      const swapTarget = shadow.host.getAttribute('data-fv-swap-target') || '*';
      const selectors = (shadow.host.getAttribute('data-fv-swap-selectors') || '').split(',').filter(Boolean);
      const swap = applySwap(swapTarget, applyFont, selectors.length ? selectors : undefined);
      const swaps = [...getState().activeSwaps.filter(s => s.originalFamily !== swapTarget), swap];
      setState({ activeSwaps: swaps, detectedFonts: detectFonts() });
      shadow.host.removeAttribute('data-fv-swap-target');
      shadow.host.removeAttribute('data-fv-swap-selectors');
      return;
    }

    // apply pairing
    const pairingH = target.dataset.applyPairingH;
    const pairingB = target.dataset.applyPairingB;
    if (pairingH && pairingB) {
      const headingSwap = applySwap('*', pairingH, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
      const bodySwap = applySwap('*', pairingB, ['body', 'p', 'li', 'span', 'a', 'td']);
      setState({
        activeSwaps: [...getState().activeSwaps, headingSwap, bodySwap],
        detectedFonts: detectFonts(),
      });
    }
  });

  // search input handling
  let debounceTimer: ReturnType<typeof setTimeout>;
  shadow.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.dataset.fvSearch !== undefined) {
      const query = target.value;
      setState({ searchQuery: query });
      clearTimeout(debounceTimer);
      if (!query) {
        setState({ searchResults: [], loading: false });
        return;
      }
      setState({ loading: true });
      debounceTimer = setTimeout(async () => {
        try {
          const results = await searchGoogleFonts(config.apiKey, query);
          setState({ searchResults: results, loading: false });
        } catch {
          setState({ loading: false });
        }
      }, 300);
    }
  });
}
