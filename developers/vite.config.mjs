import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import mkcert from 'vite-plugin-mkcert';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const DEV_HOST = 'developers.mixin.one';
const DEV_PORT = 5173;
const DEV_ORIGIN = `https://${DEV_HOST}`;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      nodePolyfills(),
      mkcert({
        hosts: [DEV_HOST],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '127.0.0.1',
      port: DEV_PORT,
      strictPort: true,
      origin: DEV_ORIGIN,
      hmr: {
        host: DEV_HOST,
        clientPort: 443,
        protocol: 'wss',
      },
      open: false,
    },
    build: {
      rollupOptions: {
        plugins: [
        ]
      }
    }
  }

  if (mode === 'production') {
    // Add production specific config here if needed
  }

  return config
})
