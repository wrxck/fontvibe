import { selectorFor } from '../core/selector.js';

const PICKER_STYLE_ID = 'fv-picker-styles';
const HIGHLIGHT_ATTR = 'data-fv-picker-highlight';

let active = false;
let highlightedEl: Element | null = null;
let onPickCallback: ((selector: string, font: string) => void) | null = null;

function injectPickerStyles(): void {
  if (document.getElementById(PICKER_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = PICKER_STYLE_ID;
  style.textContent = `
    [${HIGHLIGHT_ATTR}] { outline: 2px solid #FCE205 !important; outline-offset: 2px !important; }
    body.fv-picker-active, body.fv-picker-active * { cursor: crosshair !important; }
  `;
  document.head.appendChild(style);
}

function removePickerStyles(): void {
  document.getElementById(PICKER_STYLE_ID)?.remove();
}

function handleMouseOver(e: MouseEvent): void {
  const el = e.target as Element;
  if (highlightedEl) highlightedEl.removeAttribute(HIGHLIGHT_ATTR);
  el.setAttribute(HIGHLIGHT_ATTR, '');
  highlightedEl = el;
}

function handleClick(e: MouseEvent): void {
  e.preventDefault();
  e.stopPropagation();
  const el = e.target as Element;
  const selector = selectorFor(el);
  const font = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim();
  onPickCallback?.(selector, font);
  deactivatePicker();
}

export function activatePicker(onPick: (selector: string, font: string) => void): void {
  if (active) return;
  active = true;
  onPickCallback = onPick;
  injectPickerStyles();
  document.body.classList.add('fv-picker-active');
  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('click', handleClick, true);
}

export function deactivatePicker(): void {
  if (!active) return;
  active = false;
  onPickCallback = null;
  if (highlightedEl) {
    highlightedEl.removeAttribute(HIGHLIGHT_ATTR);
    highlightedEl = null;
  }
  document.body.classList.remove('fv-picker-active');
  document.removeEventListener('mouseover', handleMouseOver, true);
  document.removeEventListener('click', handleClick, true);
  removePickerStyles();
}

export function isPickerActive(): boolean {
  return active;
}
