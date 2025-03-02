import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
const srcPath = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: srcPath }
    ] 
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
