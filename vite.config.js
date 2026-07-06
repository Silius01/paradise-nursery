import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base on build so it works on GitHub Pages' subpath and when
// opening dist/ locally; absolute root for the dev server.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
