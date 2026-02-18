export function selectorFor(el: Element): string {
  if (el.id) return `#${el.id}`;
  const tag = el.tagName.toLowerCase();
  const classes = Array.from(el.classList).slice(0, 2).join('.');
  return classes ? `${tag}.${classes}` : tag;
}
