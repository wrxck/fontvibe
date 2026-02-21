import { describe, it, expect } from 'vitest';
import { resolveConfig, validatePosition } from './config.js';

describe('resolveConfig', () => {
  it('merges user config with defaults', () => {
    const cfg = resolveConfig({ apiKey: 'test-key', position: 'top-left' });
    expect(cfg.apiKey).toBe('test-key');
    expect(cfg.position).toBe('top-left');
    expect(cfg.wsPort).toBe(24242);
  });

  it('apiKey is required and passed through', () => {
    const cfg = resolveConfig({ apiKey: 'my-key' });
    expect(cfg.apiKey).toBe('my-key');
  });

  it('provides correct default values', () => {
    const cfg = resolveConfig({ apiKey: 'k' });
    expect(cfg.wsPort).toBe(24242);
    expect(cfg.position).toBe('bottom-right');
    expect(cfg.defaultTab).toBe('detected');
    expect(cfg.persistSwaps).toBe(true);
  });

  it('user values override defaults', () => {
    const cfg = resolveConfig({
      apiKey: 'k',
      wsPort: 9999,
      persistSwaps: false,
      defaultTab: 'search',
    });
    expect(cfg.wsPort).toBe(9999);
    expect(cfg.persistSwaps).toBe(false);
    expect(cfg.defaultTab).toBe('search');
  });
});

describe('validatePosition', () => {
  it('returns true for valid positions', () => {
    expect(validatePosition('bottom-right')).toBe(true);
    expect(validatePosition('bottom-left')).toBe(true);
    expect(validatePosition('top-right')).toBe(true);
    expect(validatePosition('top-left')).toBe(true);
  });

  it('returns false for invalid positions', () => {
    expect(validatePosition('center')).toBe(false);
    expect(validatePosition('')).toBe(false);
    expect(validatePosition('left')).toBe(false);
  });
});
