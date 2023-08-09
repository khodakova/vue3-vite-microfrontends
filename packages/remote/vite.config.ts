import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'remote',
      shared: ['vue','pinia', 'vue-router'],
      exposes: {
        './remote-button': './src/shared/ui/remote-button.vue',
        './remote-page': './src/pages/remote-page',
      },
  })
  ],
  base: 'http://localhost:7005',
  build:{
    minify:false,
    target: ["chrome89", "edge89", "firefox89", "safari15"]
  }
})
