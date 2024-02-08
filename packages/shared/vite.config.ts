import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: 'http://localhost:5001',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'dev-wrapper',
      formats: ['es'],
      fileName: 'dev-wrapper.js',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: false,
  },
});
