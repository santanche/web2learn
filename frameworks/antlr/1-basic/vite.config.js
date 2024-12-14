import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        dir: 'dist',
        format: 'es'
      }
    }
  }
})