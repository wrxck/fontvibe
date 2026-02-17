# FontVibe

Universal dev-tool for font management. Detect fonts on any website, search Google Fonts, swap fonts live, get pairing suggestions, and export CSS. Works with any dev server (Vite, Next.js, etc.) and supports MCP for AI agent integration.

## Install

```bash
npm install @matthesketh/fontvibe
```

## Quick Start

### 1. Get a Google Fonts API key

Get one from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) with the Google Fonts Developer API enabled.

### 2. Set up config

```bash
npx fontvibe init
```

This creates a `.fontviberc` file with your API key and preferences.

### 3. Add to your app

**React:**

```tsx
import { FontVibe } from '@matthesketh/fontvibe/react';

function App() {
  return (
    <>
      <FontVibe apiKey="your-api-key" />
      {/* your app */}
    </>
  );
}
```

**Vanilla JS:**

```ts
import { fontvibe } from '@matthesketh/fontvibe';

fontvibe.mount({ apiKey: 'your-api-key' });
```

The panel automatically hides in production (`NODE_ENV=production`).

## Features

### Floating Panel

A Shadow DOM panel that sits on top of your page with three tabs:

- **Detected** — shows all fonts found on the page via `document.fonts`, computed styles, and `@font-face` rules
- **Search** — search Google Fonts and apply them live
- **Pairings** — curated font pairing suggestions you can apply in one click

### Font Swapping

Click any detected font to swap it with a Google Font. Swaps inject a `<link>` to load the font and a `<style>` with targeted `!important` overrides. Fully reversible.

### Persistence

Active swaps are saved to `localStorage` and restored on page reload.

### CSS Export

Click "Export" to get a ready-to-use CSS snippet with `@import` and font-family rules for all active swaps.

## MCP Server

FontVibe includes an MCP server so AI agents can manipulate fonts on the page.

```bash
npx fontvibe mcp
```

This starts a stdio MCP server and a WebSocket bridge on `localhost:24242`. The browser panel connects automatically.

### MCP Tools

| Tool | Description |
|------|-------------|
| `fontvibe_list_fonts` | List detected fonts from the browser |
| `fontvibe_search_google_fonts` | Search Google Fonts by name or category |
| `fontvibe_apply_swap` | Swap a font on the page |
| `fontvibe_revert_swap` | Revert a specific swap |
| `fontvibe_revert_all` | Revert all swaps |
| `fontvibe_get_state` | Get current state (swaps + detected fonts) |
| `fontvibe_set_combination` | Apply multiple swaps at once |
| `fontvibe_suggest_pairings` | Get pairing suggestions |

## API

### Core exports

```ts
import {
  mount,
  destroy,
  detectFonts,
  searchGoogleFonts,
  googleFontUrl,
  applySwap,
  revertSwap,
  revertAllSwaps,
  suggestPairings,
  getAllPairings,
} from '@matthesketh/fontvibe';
```

### Config options

```ts
interface FontVibeConfig {
  apiKey: string;
  wsPort?: number;          // default: 24242
  position?: PanelPosition; // default: 'bottom-right'
  defaultTab?: 'detected' | 'search';
  persistSwaps?: boolean;   // default: true
}

type PanelPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
```

## CLI

```
fontvibe init    Create .fontviberc config file
fontvibe mcp     Start MCP server with WebSocket bridge
```

## Development

```bash
npm install
npm run build
npm run dev     # watch mode
```

## License

MIT
