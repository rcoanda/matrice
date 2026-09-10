import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/matrice/',
  server: {
    proxy: {
      '/matrice/met-image': {
        target: 'https://images.metmuseum.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/matrice\/met-image/, ''),
      },
      '/matrice/cleveland-image': {
        target: 'https://openaccess-cdn.clevelandart.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/matrice\/cleveland-image/, ''),
      },
    },
  },
})
