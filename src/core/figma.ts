import type { FigmaFontUsage } from './types.js';

interface FigmaNode {
  type: string;
  style?: { fontFamily?: string; fontPostScriptName?: string };
  children?: FigmaNode[];
}

interface FigmaFileResponse {
  document: FigmaNode;
}

function extractFonts(node: FigmaNode, usage: Map<string, FigmaFontUsage>): void {
  if (node.style?.fontFamily) {
    const family = node.style.fontFamily;
    const style = node.style.fontPostScriptName || 'Regular';
    const key = `${family}::${style}`;
    const existing = usage.get(key);
    if (existing) {
      existing.nodeCount++;
    } else {
      usage.set(key, { family, style, nodeCount: 1 });
    }
  }
  if (node.children) {
    for (const child of node.children) {
      extractFonts(child, usage);
    }
  }
}

export async function fetchFigmaFonts(
  fileKey: string,
  accessToken: string,
): Promise<FigmaFontUsage[]> {
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}?depth=2`, {
    headers: { 'X-Figma-Token': accessToken },
  });

  if (!res.ok) {
    throw new Error(`figma API error: ${res.status} ${res.statusText}`);
  }

  const data: FigmaFileResponse = await res.json();
  const usage = new Map<string, FigmaFontUsage>();
  extractFonts(data.document, usage);

  return Array.from(usage.values()).sort((a, b) => b.nodeCount - a.nodeCount);
}
