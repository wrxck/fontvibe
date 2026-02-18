import { z } from 'zod';

import { searchGoogleFonts } from '../core/google-fonts.js';
import { suggestPairings } from '../core/pairings.js';
import { sendToBrowser, isBrowserConnected } from './bridge.js';

interface ToolDef {
  name: string;
  description: string;
  schema: z.ZodObject<z.ZodRawShape>;
  handler: (args: Record<string, unknown>) => Promise<unknown>;
}

function requireBrowser(): void {
  if (!isBrowserConnected()) {
    throw new Error('no browser connected — open a page with FontVibe mounted');
  }
}

export function createTools(apiKey: string): ToolDef[] {
  return [
    {
      name: 'fontvibe_list_fonts',
      description: 'List all fonts detected on the current page',
      schema: z.object({}),
      handler: async () => {
        requireBrowser();
        return sendToBrowser('list_fonts');
      },
    },
    {
      name: 'fontvibe_search_google_fonts',
      description: 'Search Google Fonts by name or category',
      schema: z.object({
        query: z.string().describe('search query'),
      }),
      handler: async (args) => {
        return searchGoogleFonts(apiKey, args.query as string);
      },
    },
    {
      name: 'fontvibe_apply_swap',
      description: 'Swap a font on the page with a Google Font',
      schema: z.object({
        originalFamily: z.string().describe('font family to replace'),
        newFamily: z.string().describe('Google Font family to use'),
        selectors: z.array(z.string()).optional().describe('CSS selectors to target'),
        weight: z.string().optional().describe('font weight'),
      }),
      handler: async (args) => {
        requireBrowser();
        return sendToBrowser('apply_swap', args);
      },
    },
    {
      name: 'fontvibe_revert_swap',
      description: 'Revert a specific font swap by its ID',
      schema: z.object({
        swapId: z.string().describe('the swap ID to revert'),
      }),
      handler: async (args) => {
        requireBrowser();
        return sendToBrowser('revert_swap', args);
      },
    },
    {
      name: 'fontvibe_revert_all',
      description: 'Revert all active font swaps',
      schema: z.object({}),
      handler: async () => {
        requireBrowser();
        return sendToBrowser('revert_all');
      },
    },
    {
      name: 'fontvibe_get_state',
      description: 'Get current FontVibe state including active swaps and detected fonts',
      schema: z.object({}),
      handler: async () => {
        requireBrowser();
        return sendToBrowser('get_state');
      },
    },
    {
      name: 'fontvibe_set_combination',
      description: 'Apply multiple font swaps at once, replacing all current swaps',
      schema: z.object({
        swaps: z.array(z.object({
          originalFamily: z.string(),
          newFamily: z.string(),
          selectors: z.array(z.string()).optional(),
        })).describe('array of font swaps to apply'),
      }),
      handler: async (args) => {
        requireBrowser();
        return sendToBrowser('set_combination', args);
      },
    },
    {
      name: 'fontvibe_get_analytics',
      description: 'Analyse font usage on the page — weights, sizes, unused declarations',
      schema: z.object({}),
      handler: async () => {
        requireBrowser();
        return sendToBrowser('get_analytics');
      },
    },
    {
      name: 'fontvibe_suggest_pairings',
      description: 'Get font pairing suggestions, optionally filtered by font or category',
      schema: z.object({
        fontFamily: z.string().optional().describe('font to find pairings for'),
        category: z.string().optional().describe('pairing category filter'),
      }),
      handler: async (args) => {
        return suggestPairings(
          args.fontFamily as string | undefined,
          args.category as string | undefined,
        );
      },
    },
    {
      name: 'fontvibe_save_theme',
      description: 'Save current font swaps as a named theme',
      schema: z.object({
        name: z.string().describe('theme name'),
      }),
      handler: async (args) => {
        requireBrowser();
        return sendToBrowser('save_theme', { name: args.name });
      },
    },
    {
      name: 'fontvibe_list_themes',
      description: 'List all saved font themes',
      schema: z.object({}),
      handler: async () => {
        requireBrowser();
        return sendToBrowser('list_themes');
      },
    },
    {
      name: 'fontvibe_apply_theme',
      description: 'Apply a saved theme by ID',
      schema: z.object({
        themeId: z.string().describe('theme ID to apply'),
      }),
      handler: async (args) => {
        requireBrowser();
        return sendToBrowser('apply_theme', { themeId: args.themeId });
      },
    },
    {
      name: 'fontvibe_import_figma',
      description: 'Import font usage from a Figma file',
      schema: z.object({
        fileKey: z.string().describe('Figma file key'),
        accessToken: z.string().describe('Figma personal access token'),
      }),
      handler: async (args) => {
        const { fetchFigmaFonts } = await import('../core/figma.js');
        return fetchFigmaFonts(args.fileKey as string, args.accessToken as string);
      },
    },
    {
      name: 'fontvibe_screenshot_diff',
      description: 'Capture before/after screenshots of font changes',
      schema: z.object({
        url: z.string().describe('page URL to screenshot'),
      }),
      handler: async (args) => {
        const { captureScreenshot } = await import('./screenshot.js');
        return captureScreenshot(args.url as string);
      },
    },
  ];
}
