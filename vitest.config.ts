import EnvironmentPlugin from 'vite-plugin-environment'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  define: {
    global: 'window',
  },

  plugins: [EnvironmentPlugin([])],

  resolve: {
    alias: {
      '@': '/src', // Example alias for your project's source directory
    },
  },

  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
})
