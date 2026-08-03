import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/met-image': {
        target: 'https://images.metmuseum.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/met-image/, ''),
      },
      '/cleveland-image': {
        target: 'https://openaccess-cdn.clevelandart.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cleveland-image/, ''),
      },
    },
  },
})
