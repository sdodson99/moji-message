import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src/pages',
  publicDir: resolve(__dirname, 'src/public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
