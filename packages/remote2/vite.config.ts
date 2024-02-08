import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    federation({
      name: 'remote2',
      filename: 'app.js',
      shared: ['vue', 'pinia', 'vue-router', 'mitt', 'axios'],
      exposes: {
        './remote-page': './src/pages/main-page',
        './app': './src/app/app.vue',
        './routes': './src/app/providers/router-provider/routes.ts',
      },
    }),
  ],
  base: 'http://localhost:7006',
  build: {
    minify: false,
    target: ['chrome89', 'firefox89'],
  },
});
