import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    federation({
      name: 'remote1',
      filename: 'app.js',
      shared: ['vue', 'pinia', 'vue-router', 'mitt', 'axios'],
      exposes: {
        './chat-widget': './src/widgets/chat-widget/ui/chat-widget.vue',
        './remote-page': './src/pages/main-page',
        './app': './src/app/app.vue',
        './routes': './src/app/providers/router-provider/routes.ts',
      },
    }),
  ],
  base: 'http://localhost:7005',
  build: {
    minify: false,
    target: ['chrome89', 'firefox89'],
  },
});
