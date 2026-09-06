import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080,
    strictPort: true,
  },
  optimizeDeps: {
    // Resolved in-browser via the native import map in index.html, not bundled.
    exclude: ['@opsboard/dashboard-mfe', '@opsboard/alerts-mfe'],
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Resolved in-browser via the native import map in index.html, not bundled.
      external: ['@opsboard/dashboard-mfe', '@opsboard/alerts-mfe'],
    },
  },
});
