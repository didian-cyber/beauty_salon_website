import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@beauty/ui': resolve('../beauty-ui/src')
    }
  },
  server: {
    port: 3001,
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts']
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    'process.env': {
      VITE_REACT_ROUTER_FUTURE_FLAGS: JSON.stringify({
        v7_startTransition: true,
        v7_relativeSplatPath: true
      })
    }
  }
})