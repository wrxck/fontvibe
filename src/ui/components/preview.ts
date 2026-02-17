export function renderPreview(fontFamily: string): string {
  return `
    <div class="fv-preview" style="font-family: '${fontFamily}', sans-serif;">
      <div style="font-size: 20px; margin-bottom: 8px;">The quick brown fox</div>
      <div style="font-size: 14px;">jumps over the lazy dog — 0123456789</div>
      <div style="font-size: 12px; margin-top: 4px; font-style: italic;">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
    </div>
  `;
}
