import { describe, it, expect } from 'vitest';
import { renderSelectedTab } from './selected.js';
import type { PickedElementInfo } from '../../core/types.js';

function makeInfo(overrides: Partial<PickedElementInfo> = {}): PickedElementInfo {
  return {
    selector: '.hero h1',
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    fontSize: '24px',
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: '1.4',
    letterSpacing: '0px',
    color: 'rgb(255, 255, 255)',
    tagName: 'H1',
    textContent: 'Hello World',
    ...overrides,
  };
}

function parseHtml(html: string): DocumentFragment {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  return tpl.content;
}

describe('renderSelectedTab', () => {
  it('returns empty-state message when passed null', () => {
    const html = renderSelectedTab(null);
    expect(html).toContain('fv-empty');
    expect(html).toContain('Click "Pick"');
  });

  it('renders editable inputs for all font properties', () => {
    const html = renderSelectedTab(makeInfo());
    const props = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'color'];
    for (const prop of props) {
      expect(html).toContain(`data-fv-edit="${prop}"`);
    }
  });

  it('truncates text preview at 80 characters', () => {
    const longText = 'A'.repeat(100);
    const html = renderSelectedTab(makeInfo({ textContent: longText }));
    expect(html).toContain('A'.repeat(80) + '...');
    expect(html).not.toContain('A'.repeat(81));
  });

  it('does not truncate text at exactly 80 characters', () => {
    const exactText = 'B'.repeat(80);
    const html = renderSelectedTab(makeInfo({ textContent: exactText }));
    expect(html).toContain(exactText);
    expect(html).not.toContain('...');
  });

  it('parses font family stack — primary is first family without quotes', () => {
    const html = renderSelectedTab(makeInfo({ fontFamily: '"Roboto Mono", monospace' }));
    const frag = parseHtml(html);
    const input = frag.querySelector('[data-fv-edit="fontFamily"]') as HTMLInputElement;
    expect(input.value).toBe('Roboto Mono');
  });

  it('fontWeight select has correct option selected', () => {
    const html = renderSelectedTab(makeInfo({ fontWeight: '600' }));
    const frag = parseHtml(html);
    const selected = frag.querySelector('[data-fv-edit="fontWeight"] option[selected]') as HTMLOptionElement;
    expect(selected.value).toBe('600');
  });

  it('fontStyle select has correct option selected', () => {
    const html = renderSelectedTab(makeInfo({ fontStyle: 'italic' }));
    const frag = parseHtml(html);
    const selected = frag.querySelector('[data-fv-edit="fontStyle"] option[selected]') as HTMLOptionElement;
    expect(selected.value).toBe('italic');
  });

  it('color picker gets correct hex value from RGB input', () => {
    const html = renderSelectedTab(makeInfo({ color: 'rgb(252, 226, 5)' }));
    const frag = parseHtml(html);
    const input = frag.querySelector('[data-fv-edit="color"]') as HTMLInputElement;
    expect(input.value).toBe('#fce205');
  });

  it('HTML-escapes content to prevent XSS', () => {
    const html = renderSelectedTab(makeInfo({ textContent: '<script>alert("xss")</script>' }));
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('attribute-escapes selector values', () => {
    const html = renderSelectedTab(makeInfo({ selector: 'div[class="foo"]' }));
    expect(html).toContain('data-fv-selector="div[class=&quot;foo&quot;]"');
  });
});
