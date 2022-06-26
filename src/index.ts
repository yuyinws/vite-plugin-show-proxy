import type { Plugin } from 'vite'
import { blue, cyan, yellow } from 'kolorist'

type Proxy = Record<string, string>

export default function ShowProxy(): Plugin {
  const proxy: Proxy[] = []
  return {
    name: 'vite-plugin-show-proxy',
    apply: 'serve',
    config(config) {
      const configProxy = config?.server?.proxy
      for (const key in configProxy) {
        const value = configProxy[key]
        if (typeof value === 'string') {
          proxy.push({ [key]: value })
        }
        else {
          const { target } = value
          if (typeof target === 'string')
            proxy.push({ [key]: target })
        }
      }
    },
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(`${blue('  >Show Proxy:')}`)
          for (const item of proxy) {
            for (const key in item) {
              // eslint-disable-next-line no-console
              console.log(`    ${yellow(`'${key}'`)} => ${cyan(item[key])}`)
            }
          }
        }, 0)
      })
    },

  }
}
