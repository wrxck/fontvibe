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
  activeTab: 'detected' | 'search' | 'pairings' | 'analytics' | 'themes' | 'about';
  searchQuery: string;
  searchResults: GoogleFont[];
  loading: boolean;
  pickerActive: boolean;
  pickerSelector: string | null;
  canUndo: boolean;
  canRedo: boolean;
}

export interface FontAnalytics {
  family: string;
  elementCount: number;
  weights: string[];
  sizes: string[];
  selectors: string[];
}

export interface AnalyticsReport {
  fonts: FontAnalytics[];
  unusedFontFaces: string[];
  totalElements: number;
}

export interface VariableAxis {
  tag: string;
  name: string;
  min: number;
  max: number;
  default: number;
}

export interface VariableFontInfo {
  family: string;
  axes: VariableAxis[];
}

export interface A11yIssue {
  type: 'thin-weight' | 'decorative-body' | 'small-size';
  family: string;
  selector: string;
  message: string;
  severity: 'warning' | 'error';
}

export interface FontPerfData {
  family: string;
  variantCount: number;
  estimatedSize: number;
  displayStrategy: string;
  rating: 'green' | 'amber' | 'red';
}

export interface LocalFont {
  family: string;
  objectUrl: string;
  fileName: string;
}

export interface HistoryEntry {
  id: string;
  swaps: FontSwap[];
  timestamp: number;
  label: string;
}

export interface FontTheme {
  id: string;
  name: string;
  swaps: FontSwap[];
  createdAt: number;
}

export interface FigmaFontUsage {
  family: string;
  style: string;
  nodeCount: number;
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
