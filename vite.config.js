import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app at /<repo-name>/, so all asset paths
  // and the React router base must match.
  base: '/explorer/',
})
