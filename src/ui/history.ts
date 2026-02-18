import type { FontSwap, HistoryEntry } from '../core/types.js';
import { applySwap, revertAllSwaps } from '../core/swapper.js';
import { getState, setState } from './state.js';

const past: HistoryEntry[] = [];
const future: HistoryEntry[] = [];

let entryCounter = 0;

export function pushHistory(label: string): void {
  const state = getState();
  past.push({
    id: `hist-${++entryCounter}`,
    swaps: [...state.activeSwaps],
    timestamp: Date.now(),
    label,
  });
  future.length = 0;
  setState({ canUndo: true, canRedo: false });
}

export function undo(): void {
  if (past.length === 0) return;

  const current = past.pop()!;
  future.push({
    id: `hist-${++entryCounter}`,
    swaps: [...getState().activeSwaps],
    timestamp: Date.now(),
    label: current.label,
  });

  revertAllSwaps();
  const swaps = current.swaps.map(s =>
    applySwap(s.originalFamily, s.newFamily, s.selectors, s.weight)
  );

  setState({
    activeSwaps: swaps,
    canUndo: past.length > 0,
    canRedo: true,
  });
}

export function redo(): void {
  if (future.length === 0) return;

  const next = future.pop()!;
  past.push({
    id: `hist-${++entryCounter}`,
    swaps: [...getState().activeSwaps],
    timestamp: Date.now(),
    label: next.label,
  });

  revertAllSwaps();
  const swaps = next.swaps.map(s =>
    applySwap(s.originalFamily, s.newFamily, s.selectors, s.weight)
  );

  setState({
    activeSwaps: swaps,
    canUndo: true,
    canRedo: future.length > 0,
  });
}

export function getHistory(): { pastCount: number; futureCount: number } {
  return { pastCount: past.length, futureCount: future.length };
}
