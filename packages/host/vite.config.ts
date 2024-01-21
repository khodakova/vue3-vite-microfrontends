import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"

// const remotesMap = {
//   'empty': ''
// };

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {},
      shared: ['vue', 'pinia', 'vue-router']
  })
  ],
  build:{
    minify:false,
    target: ["chrome89", "firefox89"]
  }
})
