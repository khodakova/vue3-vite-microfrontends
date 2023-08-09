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
        './remote-button': './src/remote-button.vue',
      },
  })
  ],
  base: 'http://localhost:5001',
  build:{
    minify:false,
    target: ["chrome89", "edge89", "firefox89", "safari15"]
  }
})
