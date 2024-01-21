import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'remote',
      filename: 'app.js',
      shared: ['vue','pinia', 'vue-router'],
      exposes: {
        './remote-button': './src/shared/ui/remote-button.vue',
        './remote-page': './src/pages/main-page',
        './app': './src/app/app.vue',
        './routes': './src/app/providers/router-provider/routes.ts',
      },
  })
  ],
  base: 'http://localhost:7005',
  build:{
    minify:false,
    target: ["chrome89", "firefox89"]
  }
})
