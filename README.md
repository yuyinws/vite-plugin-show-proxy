# vite-plugin-show-proxy

[![NPM version](https://img.shields.io/npm/v/vite-plugin-show-proxy?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-show-proxy)

# Usage
vite.config.ts
```ts
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

```
```
npm run dev
```
```
 vite v2.9.12 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose

  ready in 430ms.

  >Show Proxy:
    '/foo' => http://localhost:4567
    '/api' => http://jsonplaceholder.typicode.com
    '^/fallback/.*' => http://jsonplaceholder.typicode.com
    '/socket.io' => ws://localhost:3000
```

## License

[MIT](./LICENSE) License © 2022 [yuyinws](https://github.com/yuyinws)
