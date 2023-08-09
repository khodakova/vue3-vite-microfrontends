import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/

const remotesMap = {
  "remote": "http://localhost:7005/assets/remoteEntry.js",
};
const loadJS = (url, fn) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = fn;
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: remotesMap,
      shared: ['vue','pinia', 'vue-router']
  })
  ],
  build:{
    minify:false,
    target: ["chrome89", "edge89", "firefox89", "safari15"]
  }
})
