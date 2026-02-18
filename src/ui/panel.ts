import type { FontVibeConfig, FontVibeState } from '../core/types.js';
import { detectFonts } from '../core/detector.js';
import { searchGoogleFonts, googleFontUrl } from '../core/google-fonts.js';
import { applySwap, revertSwap, revertAllSwaps } from '../core/swapper.js';
import { suggestPairings } from '../core/pairings.js';
import { saveSwaps, loadSwaps } from '../core/storage.js';
import { getState, setState, subscribe } from './state.js';
import { getPanelStyles } from './styles.js';
import { renderFontList } from './components/font-list.js';
import { renderSearchTab } from './components/search.js';
import { renderExportDialog, bindExportEvents } from './components/export-dialog.js';
import { activatePicker, deactivatePicker, isPickerActive } from './picker.js';
import { renderAnalyticsTab } from './components/analytics.js';
import { analyseFonts } from '../core/analytics.js';
import { checkAccessibility } from '../core/a11y.js';
import { getFontPerfData } from '../core/perf.js';
import type { AnalyticsReport, A11yIssue, FontPerfData, LocalFont } from '../core/types.js';
import { detectVariableAxes, applyVariationSettings } from '../core/variable-fonts.js';
import { pushHistory, undo, redo, getHistory } from './history.js';
import { renderThemesTab } from './components/themes.js';
import { renderAboutTab } from './components/about.js';
import { saveTheme, listThemes, deleteTheme, getTheme } from '../core/themes.js';

let analyticsReport: AnalyticsReport | null = null;
let a11yIssues: A11yIssue[] = [];
let perfData: FontPerfData[] = [];
const localFonts: LocalFont[] = [];

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
  const analyticsActive = state.activeTab === 'analytics' ? 'active' : '';
  const themesActive = state.activeTab === 'themes' ? 'active' : '';

  let bodyContent: string;
  if (state.activeTab === 'detected') {
    bodyContent = renderFontList(state.detectedFonts, state.activeSwaps, detectVariableAxes());
  } else if (state.activeTab === 'search') {
    bodyContent = renderSearchTab(state.searchQuery, state.searchResults, state.loading);
  } else if (state.activeTab === 'analytics') {
    bodyContent = renderAnalyticsTab(analyticsReport, a11yIssues, perfData);
  } else if (state.activeTab === 'themes') {
    bodyContent = renderThemesTab(listThemes());
  } else if (state.activeTab === 'about') {
    bodyContent = renderAboutTab();
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
      <div class="fv-header-actions">
        <button class="fv-btn fv-btn-secondary fv-pick-btn${state.pickerActive ? ' active' : ''}" data-fv-pick title="Pick element">Pick</button>
        <button class="fv-btn fv-btn-secondary" data-fv-tab="about" title="About FontVibe" style="padding: 4px 6px; font-size: 14px;">&#9432;</button>
        <button class="fv-close" data-fv-close>&times;</button>
      </div>
    </div>
    <div class="fv-tabs">
      <button class="fv-tab ${detectedActive}" data-fv-tab="detected">Detected</button>
      <button class="fv-tab ${searchActive}" data-fv-tab="search">Search</button>
      <button class="fv-tab ${pairingsActive}" data-fv-tab="pairings">Pairings</button>
      <button class="fv-tab ${analyticsActive}" data-fv-tab="analytics">Analytics</button>
      <button class="fv-tab ${themesActive}" data-fv-tab="themes">Themes</button>
    </div>
    <div class="fv-body" data-fv-body>${bodyContent}</div>
    <div class="fv-footer">
      <div class="fv-font-actions">
        <button class="fv-history-btn" data-fv-undo title="Undo (Ctrl+Z)"${state.canUndo ? '' : ' disabled'}>&#8630;</button>
        <button class="fv-history-btn" data-fv-redo title="Redo (Ctrl+Y)"${state.canRedo ? '' : ' disabled'}>&#8631;</button>
        <span class="fv-footer-text">${swapCount} swap${swapCount !== 1 ? 's' : ''}</span>
      </div>
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

    if (target.dataset.fvPick !== undefined) {
      if (isPickerActive()) {
        deactivatePicker();
        setState({ pickerActive: false });
      } else {
        setState({ pickerActive: true });
        activatePicker((selector, font) => {
          setState({
            pickerActive: false,
            pickerSelector: selector,
            activeTab: 'search',
            searchQuery: '',
            searchResults: [],
          });
          shadow.host.setAttribute('data-fv-swap-target', font);
          shadow.host.setAttribute('data-fv-swap-selectors', selector);
        });
      }
      return;
    }

    if (target.dataset.fvTab) {
      setState({ activeTab: target.dataset.fvTab as FontVibeState['activeTab'] });
      return;
    }

    if (target.dataset.fvUndo !== undefined) {
      undo();
      return;
    }

    if (target.dataset.fvRedo !== undefined) {
      redo();
      return;
    }

    if (target.dataset.fvRevertAll !== undefined) {
      pushHistory('revert all');
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

    // save theme
    if (target.dataset.fvSaveTheme !== undefined) {
      const name = prompt('Theme name:');
      if (name) {
        saveTheme(name, getState().activeSwaps);
        setState({ activeTab: 'themes' });
      }
      return;
    }

    // apply theme
    const applyThemeId = target.dataset.fvApplyTheme;
    if (applyThemeId) {
      const theme = getTheme(applyThemeId);
      if (theme) {
        pushHistory('apply theme');
        revertAllSwaps();
        const swaps = theme.swaps.map(s =>
          applySwap(s.originalFamily, s.newFamily, s.selectors, s.weight)
        );
        setState({ activeSwaps: swaps, detectedFonts: detectFonts() });
      }
      return;
    }

    // delete theme
    const deleteThemeId = target.dataset.fvDeleteTheme;
    if (deleteThemeId) {
      deleteTheme(deleteThemeId);
      setState({ activeTab: 'themes' });
      return;
    }

    // analytics scan
    if (target.dataset.fvScan !== undefined) {
      analyticsReport = analyseFonts();
      a11yIssues = checkAccessibility(analyticsReport.fonts);
      perfData = getFontPerfData(analyticsReport.fonts.map(f => f.family));
      setState({ activeTab: 'analytics' });
      return;
    }

    // font list revert
    const revertId = target.dataset.revert;
    if (revertId) {
      pushHistory('revert swap');
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
      pushHistory('apply font');
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
      pushHistory('apply pairing');
      const headingSwap = applySwap('*', pairingH, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
      const bodySwap = applySwap('*', pairingB, ['body', 'p', 'li', 'span', 'a', 'td']);
      setState({
        activeSwaps: [...getState().activeSwaps, headingSwap, bodySwap],
        detectedFonts: detectFonts(),
      });
    }
  });

  // font preview on hover
  shadow.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement;
    const family = target.dataset.hoverPreview;
    if (!family) return;
    const preview = target.nextElementSibling as HTMLElement | null;
    if (!preview || !preview.classList.contains('fv-preview')) return;
    // load font into host document
    const linkId = `fv-hover-${family.replace(/\s/g, '-')}`;
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = googleFontUrl(family);
      document.head.appendChild(link);
    }
    preview.style.fontFamily = `'${family}', sans-serif`;
    preview.style.display = 'block';
  }, true);

  shadow.addEventListener('mouseleave', (e) => {
    const target = e.target as HTMLElement;
    if (!target.dataset.hoverPreview) return;
    const preview = target.nextElementSibling as HTMLElement | null;
    if (!preview || !preview.classList.contains('fv-preview')) return;
    preview.style.fontFamily = '';
    preview.style.display = '';
  }, true);

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

  // variable font axis sliders
  shadow.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const family = target.dataset.fvAxisFamily;
    const tag = target.dataset.fvAxisTag;
    if (family && tag) {
      applyVariationSettings(family, { [tag]: Number(target.value) });
      const label = shadow.querySelector(`[data-fv-axis-value="${family}-${tag}"]`);
      if (label) label.textContent = target.value;
    }
  });

  // drag-and-drop local fonts
  const panelEl = shadow.querySelector('.fv-panel');
  if (panelEl) {
    panelEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      (e as DragEvent).dataTransfer!.dropEffect = 'copy';
      panelEl.classList.add('fv-drag-active');
    });

    panelEl.addEventListener('dragleave', () => {
      panelEl.classList.remove('fv-drag-active');
    });

    panelEl.addEventListener('drop', (e) => {
      e.preventDefault();
      panelEl.classList.remove('fv-drag-active');
      const files = (e as DragEvent).dataTransfer?.files;
      if (!files) return;

      for (const file of files) {
        const validTypes = ['font/woff2', 'font/woff', 'font/ttf', 'font/otf',
          'application/font-woff2', 'application/font-woff', 'application/x-font-ttf'];
        const ext = file.name.split('.').pop()?.toLowerCase();
        const validExts = ['woff2', 'woff', 'ttf', 'otf'];
        if (!validTypes.includes(file.type) && !validExts.includes(ext || '')) continue;

        const objectUrl = URL.createObjectURL(file);
        const family = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9]/g, ' ').trim();

        const fontFace = document.createElement('style');
        fontFace.textContent = `@font-face { font-family: "${family}"; src: url("${objectUrl}"); }`;
        document.head.appendChild(fontFace);

        localFonts.push({ family, objectUrl, fileName: file.name });

        pushHistory('drop local font');
        const swap = applySwap('*', family);
        setState({
          activeSwaps: [...getState().activeSwaps, swap],
          detectedFonts: detectFonts(),
        });
      }
    });
  }

  // keyboard shortcuts for undo/redo
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo();
    }
  });
}
