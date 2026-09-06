import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8082,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 8082,
    strictPort: true,
    cors: true,
  },
  build: {
    lib: {
      entry: 'src/opsboard-alerts-mfe.tsx',
      formats: ['es'],
      fileName: () => 'opsboard-alerts-mfe.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client'],
    },
  },
});
