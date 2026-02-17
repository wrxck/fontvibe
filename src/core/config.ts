import type { FontVibeConfig, PanelPosition } from './types.js';

const DEFAULTS: Omit<FontVibeConfig, 'apiKey'> = {
  wsPort: 24242,
  position: 'bottom-right',
  defaultTab: 'detected',
  persistSwaps: true,
};

export function resolveConfig(partial: Partial<FontVibeConfig> & { apiKey: string }): FontVibeConfig {
  return { ...DEFAULTS, ...partial };
}

export function readConfigFile(): Partial<FontVibeConfig> | null {
  if (typeof window !== 'undefined') return null;
  try {
    const fs = require('node:fs');
    const path = require('node:path');
    const filePath = path.resolve(process.cwd(), '.fontviberc');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function validatePosition(pos: string): pos is PanelPosition {
  return ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(pos);
}
