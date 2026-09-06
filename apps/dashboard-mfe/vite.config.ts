import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 8081,
    strictPort: true,
    cors: true,
  },
  build: {
    lib: {
      entry: 'src/opsboard-dashboard-mfe.tsx',
      formats: ['es'],
      fileName: () => 'opsboard-dashboard-mfe.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client'],
    },
  },
});
