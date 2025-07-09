/*import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // your Go backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});*/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Go backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'build', // Required for Render static site deploy
  },
});


