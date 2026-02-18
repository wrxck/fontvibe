import type { Plugin } from 'vite';

export interface FontVibePluginOptions {
  apiKey: string;
  wsPort?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function fontvibe(options: FontVibePluginOptions): Plugin {
  const { apiKey, wsPort = 24242, position = 'bottom-right' } = options;

  return {
    name: 'vite-plugin-fontvibe',
    apply: 'serve',
    transformIndexHtml() {
      const config = JSON.stringify({ apiKey, wsPort, position });
      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: `
            import { mount } from '@matthesketh/fontvibe';
            mount(${config});
          `,
          injectTo: 'body' as const,
        },
      ];
    },
  };
}
