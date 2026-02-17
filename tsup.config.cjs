/** @type {import('tsup').Options[]} */
const config = [
  {
    entry: {
      index: 'src/index.ts',
      react: 'src/adapters/react.tsx',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    treeshake: true,
    external: ['react', 'ws', '@modelcontextprotocol/sdk', 'prompts', 'node:fs', 'node:path', 'node:http'],
    define: {
      'process.env.NODE_ENV': 'process.env.NODE_ENV',
    },
  },
  {
    entry: { cli: 'src/cli.ts' },
    format: ['esm'],
    banner: { js: '#!/usr/bin/env node' },
    external: ['ws', '@modelcontextprotocol/sdk', 'prompts', 'zod'],
    platform: 'node',
  },
];

module.exports = config;
