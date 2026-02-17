export type {
  FontVibeConfig,
  DetectedFont,
  GoogleFont,
  FontSwap,
  FontPairing,
  FontVibeState,
  PanelPosition,
} from './core/types.js';

export { fontvibe } from './adapters/vanilla.js';
export { mount, destroy } from './ui/mount.js';
export { detectFonts } from './core/detector.js';
export { searchGoogleFonts, googleFontUrl } from './core/google-fonts.js';
export { applySwap, revertSwap, revertAllSwaps } from './core/swapper.js';
export { suggestPairings, getAllPairings } from './core/pairings.js';
