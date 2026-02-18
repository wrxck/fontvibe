import type { FontTheme, FontSwap } from './types.js';

const STORAGE_KEY = 'fontvibe-themes';

function loadThemes(): FontTheme[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistThemes(themes: FontTheme[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
}

let themeCounter = 0;

export function saveTheme(name: string, swaps: FontSwap[]): FontTheme {
  const themes = loadThemes();
  const theme: FontTheme = {
    id: `theme-${Date.now()}-${++themeCounter}`,
    name,
    swaps: [...swaps],
    createdAt: Date.now(),
  };
  themes.push(theme);
  persistThemes(themes);
  return theme;
}

export function listThemes(): FontTheme[] {
  return loadThemes();
}

export function deleteTheme(id: string): boolean {
  const themes = loadThemes();
  const filtered = themes.filter(t => t.id !== id);
  if (filtered.length === themes.length) return false;
  persistThemes(filtered);
  return true;
}

export function getTheme(id: string): FontTheme | null {
  return loadThemes().find(t => t.id === id) || null;
}

export function exportThemes(): string {
  return JSON.stringify(loadThemes(), null, 2);
}

export function importThemes(json: string): FontTheme[] {
  const imported: FontTheme[] = JSON.parse(json);
  const existing = loadThemes();
  const existingIds = new Set(existing.map(t => t.id));
  const newThemes = imported.filter(t => !existingIds.has(t.id));
  const merged = [...existing, ...newThemes];
  persistThemes(merged);
  return merged;
}
