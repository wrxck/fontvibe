import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dev',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  test: {
    root: '.',
    environment: 'happy-dom',
  },
});
