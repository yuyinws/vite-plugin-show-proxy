import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ShowProxy from 'vite-plugin-show-proxy'

export default defineConfig({
  plugins: [
    vue(),
    ShowProxy(),
  ],
  server: {
    proxy: {
      '/foo': 'http://localhost:4567',
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fallback/, ''),
      },
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
})
