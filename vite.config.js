import { fileURLToPath } from 'node:url'
import { URL } from 'url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  esbuild:{
    drop: ['debugger'], // 去除console.log和debugger
    pure: ['console.log'], // 去除console.log
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 34567,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://10.12.1.29:8888',
        target: 'https://acmer.leezekee.top',
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // logLevel: 'debug' // 设置日志级别为 debug
      }
    }
  }
})
