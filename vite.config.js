import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/studio/',
  server: {
    proxy: {
      '/studio/met-image': {
        target: 'https://images.metmuseum.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/studio\/met-image/, ''),
      },
      '/studio/cleveland-image': {
        target: 'https://openaccess-cdn.clevelandart.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/studio\/cleveland-image/, ''),
      },
    },
  },
})
