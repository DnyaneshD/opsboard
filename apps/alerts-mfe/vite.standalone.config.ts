import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds the standalone preview page (index.html + standalone.tsx) into the
// same dist/ output as vite.config.ts's single-spa lib build, so a static
// host (e.g. Vercel) serving dist/ has something to render at "/".
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
  },
});
