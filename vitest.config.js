/* eslint-disable spaced-comment */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['./src/**/*.test.[jt]s?(x)'],
    setupFiles: ['./test/integration/setup/analytics.ts'],
    coverage: {
      all: true,
      src: './src',
      branches: 75,
      lines: 75,
      functions: 75,
      statements: 75,
    },
    environment: 'jsdom',
    globals: true,
    css: true,
  },
});
