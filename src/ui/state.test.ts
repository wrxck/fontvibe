import { describe, it, expect, beforeEach } from 'vitest';
import { getState, setState, subscribe, resetState } from './state.js';

beforeEach(() => {
  resetState();
});

describe('getState', () => {
  it('returns correct initial defaults', () => {
    const s = getState();
    expect(s.detectedFonts).toEqual([]);
    expect(s.activeSwaps).toEqual([]);
    expect(s.panelOpen).toBe(false);
    expect(s.activeTab).toBe('detected');
    expect(s.searchQuery).toBe('');
    expect(s.searchResults).toEqual([]);
    expect(s.loading).toBe(false);
    expect(s.pickerActive).toBe(false);
    expect(s.pickerSelector).toBe(null);
    expect(s.pickedElement).toBe(null);
    expect(s.canUndo).toBe(false);
    expect(s.canRedo).toBe(false);
  });
});

describe('setState', () => {
  it('merges partial state without replacing unrelated fields', () => {
    setState({ panelOpen: true });
    const s = getState();
    expect(s.panelOpen).toBe(true);
    expect(s.activeTab).toBe('detected');
    expect(s.searchQuery).toBe('');
  });

  it('notifies all subscribers with updated state', () => {
    const calls: boolean[] = [];
    subscribe(s => calls.push(s.panelOpen));
    subscribe(s => calls.push(s.panelOpen));
    setState({ panelOpen: true });
    expect(calls).toEqual([true, true]);
  });
});

describe('subscribe', () => {
  it('returns an unsubscribe function that stops notifications', () => {
    const calls: string[] = [];
    const unsub = subscribe(() => calls.push('called'));
    setState({ panelOpen: true });
    expect(calls).toHaveLength(1);

    unsub();
    setState({ panelOpen: false });
    expect(calls).toHaveLength(1);
  });
});

describe('resetState', () => {
  it('resets to initial values and clears all listeners', () => {
    setState({ panelOpen: true, searchQuery: 'inter', loading: true });
    const calls: string[] = [];
    subscribe(() => calls.push('called'));

    resetState();

    const s = getState();
    expect(s.panelOpen).toBe(false);
    expect(s.searchQuery).toBe('');
    expect(s.loading).toBe(false);

    // listeners were cleared, so this should not trigger the subscriber above
    setState({ panelOpen: true });
    expect(calls).toHaveLength(0);
  });
});
