import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    federation({
      name: 'host',
      remotes: {
        empty: 'empty',
      },
      shared: ['vue', 'pinia', 'vue-router', 'axios'],
    }),
  ],
  build: {
    minify: false,
    target: ['chrome89', 'firefox89'],
  },
});
