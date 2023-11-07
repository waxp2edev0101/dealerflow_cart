import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import mkcert from 'vite-plugin-mkcert'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  define: {
    global: 'window',
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  plugins: [react(), EnvironmentPlugin([]), mkcert(), svgr()],
  publicDir: 'public',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: true,
    https: true,
    port: 3000,
  },
})
