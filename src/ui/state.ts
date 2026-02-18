import type { FontVibeState } from '../core/types.js';

type Listener = (state: FontVibeState) => void;

const listeners = new Set<Listener>();

let state: FontVibeState = {
  detectedFonts: [],
  activeSwaps: [],
  panelOpen: false,
  activeTab: 'detected',
  searchQuery: '',
  searchResults: [],
  loading: false,
  pickerActive: false,
  pickerSelector: null,
  canUndo: false,
  canRedo: false,
};

export function getState(): FontVibeState {
  return state;
}

export function setState(partial: Partial<FontVibeState>): void {
  state = { ...state, ...partial };
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetState(): void {
  state = {
    detectedFonts: [],
    activeSwaps: [],
    panelOpen: false,
    activeTab: 'detected',
    searchQuery: '',
    searchResults: [],
    loading: false,
    pickerActive: false,
    pickerSelector: null,
    canUndo: false,
    canRedo: false,
  };
  listeners.clear();
}
