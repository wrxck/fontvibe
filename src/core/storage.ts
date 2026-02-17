import type { FontSwap } from './types.js';

const STORAGE_KEY = 'fontvibe-swaps';

export function saveSwaps(swaps: FontSwap[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(swaps));
  } catch {
    // localStorage unavailable or quota exceeded
  }
}

export function loadSwaps(): FontSwap[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clearSwaps(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}
