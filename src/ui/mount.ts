import type { FontVibeConfig, WsMessage } from '../core/types.js';
import { resolveConfig } from '../core/config.js';
import { createPanel } from './panel.js';
import { getState, setState } from './state.js';
import { detectFonts } from '../core/detector.js';
import { applySwap, revertSwap, revertAllSwaps } from '../core/swapper.js';
import { searchGoogleFonts } from '../core/google-fonts.js';
import { suggestPairings } from '../core/pairings.js';
import { analyseFonts } from '../core/analytics.js';
import { saveTheme, listThemes, getTheme } from '../core/themes.js';
import { resetState } from './state.js';

let panelInstance: { host: HTMLElement; destroy: () => void } | null = null;
let wsConnection: WebSocket | null = null;

export function mount(options: Partial<FontVibeConfig> & { apiKey: string }): () => void {
  if (panelInstance) return panelInstance.destroy;

  const config = resolveConfig(options);
  panelInstance = createPanel(config);
  document.body.appendChild(panelInstance.host);

  connectWs(config);

  return destroy;
}

export function destroy(): void {
  if (panelInstance) {
    panelInstance.destroy();
    panelInstance = null;
  }
  if (wsConnection) {
    wsConnection.close();
    wsConnection = null;
  }
  resetState();
}

function connectWs(config: FontVibeConfig): void {
  const port = config.wsPort || 24242;

  try {
    const ws = new WebSocket(`ws://localhost:${port}`);
    wsConnection = ws;

    ws.addEventListener('message', async (event) => {
      try {
        const msg: WsMessage = JSON.parse(event.data as string);
        const result = await handleWsCommand(msg, config);
        ws.send(JSON.stringify({ type: 'response', id: msg.id, result }));
      } catch (err) {
        const msg: WsMessage = JSON.parse(event.data as string);
        ws.send(JSON.stringify({
          type: 'response',
          id: msg.id,
          error: err instanceof Error ? err.message : 'unknown error',
        }));
      }
    });

    ws.addEventListener('close', () => {
      wsConnection = null;
      // reconnect after delay
      setTimeout(() => {
        if (panelInstance) connectWs(config);
      }, 3000);
    });
  } catch {
    // ws server not running, that's fine
  }
}

async function handleWsCommand(
  msg: WsMessage,
  config: FontVibeConfig,
): Promise<unknown> {
  const payload = (msg.payload || {}) as Record<string, unknown>;

  switch (msg.type) {
    case 'list_fonts':
      return detectFonts();

    case 'search_google_fonts':
      return searchGoogleFonts(config.apiKey, payload.query as string);

    case 'apply_swap': {
      const swap = applySwap(
        payload.originalFamily as string,
        payload.newFamily as string,
        payload.selectors as string[] | undefined,
        payload.weight as string | undefined,
      );
      setState({ activeSwaps: [...getState().activeSwaps, swap] });
      return swap;
    }

    case 'revert_swap': {
      const ok = revertSwap(payload.swapId as string);
      if (ok) {
        setState({ activeSwaps: getState().activeSwaps.filter(s => s.id !== payload.swapId) });
      }
      return { success: ok };
    }

    case 'revert_all': {
      const count = revertAllSwaps();
      setState({ activeSwaps: [] });
      return { reverted: count };
    }

    case 'get_state':
      return getState();

    case 'set_combination': {
      revertAllSwaps();
      const swaps = (payload.swaps as Array<{ originalFamily: string; newFamily: string; selectors?: string[] }>)
        .map(s => applySwap(s.originalFamily, s.newFamily, s.selectors));
      setState({ activeSwaps: swaps });
      return swaps;
    }

    case 'suggest_pairings':
      return suggestPairings(payload.fontFamily as string, payload.category as string);

    case 'get_analytics':
      return analyseFonts();

    case 'save_theme': {
      const theme = saveTheme(payload.name as string, getState().activeSwaps);
      return theme;
    }

    case 'list_themes':
      return listThemes();

    case 'apply_theme': {
      const theme = getTheme(payload.themeId as string);
      if (!theme) throw new Error(`theme not found: ${payload.themeId}`);
      revertAllSwaps();
      const swaps = theme.swaps.map(s =>
        applySwap(s.originalFamily, s.newFamily, s.selectors, s.weight)
      );
      setState({ activeSwaps: swaps });
      return swaps;
    }

    default:
      throw new Error(`unknown command: ${msg.type}`);
  }
}
