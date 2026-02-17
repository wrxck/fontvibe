export interface FontVibeConfig {
  apiKey: string;
  wsPort?: number;
  position?: PanelPosition;
  defaultTab?: 'detected' | 'search';
  persistSwaps?: boolean;
}

export type PanelPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface DetectedFont {
  family: string;
  source: 'document-fonts' | 'computed-style' | 'font-face';
  weight?: string;
  style?: string;
  selectors: string[];
  elementCount: number;
}

export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  lastModified: string;
  popularity: number;
}

export interface GoogleFontsResponse {
  kind: string;
  items: GoogleFontRaw[];
}

export interface GoogleFontRaw {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  lastModified: string;
  files: Record<string, string>;
}

export interface FontSwap {
  id: string;
  originalFamily: string;
  newFamily: string;
  selectors: string[];
  weight?: string;
  style?: string;
  timestamp: number;
}

export interface FontPairing {
  heading: string;
  body: string;
  category: string;
  description: string;
}

export interface FontVibeState {
  detectedFonts: DetectedFont[];
  activeSwaps: FontSwap[];
  panelOpen: boolean;
  activeTab: 'detected' | 'search';
  searchQuery: string;
  searchResults: GoogleFont[];
  loading: boolean;
}

export interface WsMessage {
  type: string;
  id?: string;
  payload?: unknown;
}

export interface WsResponse {
  type: string;
  id?: string;
  result?: unknown;
  error?: string;
}
