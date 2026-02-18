export type {
  FontVibeConfig,
  DetectedFont,
  GoogleFont,
  FontSwap,
  FontPairing,
  FontVibeState,
  PanelPosition,
  FontAnalytics,
  AnalyticsReport,
  VariableAxis,
  VariableFontInfo,
  A11yIssue,
  FontPerfData,
  LocalFont,
  HistoryEntry,
  FontTheme,
  FigmaFontUsage,
} from './core/types.js';

export { fontvibe } from './adapters/vanilla.js';
export { mount, destroy } from './ui/mount.js';
export { detectFonts } from './core/detector.js';
export { searchGoogleFonts, googleFontUrl } from './core/google-fonts.js';
export { applySwap, revertSwap, revertAllSwaps } from './core/swapper.js';
export { suggestPairings, getAllPairings } from './core/pairings.js';
export { analyseFonts } from './core/analytics.js';
export { selectorFor } from './core/selector.js';
export { checkAccessibility } from './core/a11y.js';
export { getFontPerfData } from './core/perf.js';
export { detectVariableAxes, applyVariationSettings } from './core/variable-fonts.js';
export { saveTheme, listThemes, deleteTheme, getTheme, exportThemes, importThemes } from './core/themes.js';
export { fetchFigmaFonts } from './core/figma.js';
