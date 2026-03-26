import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Für GitHub Pages: Setze den Base-Pfad auf den Repository-Namen
  // Falls dein Repo "mailgen" heißt, nutze '/mailgen/'
  // Für eine Custom Domain oder username.github.io nutze '/'
  base: '/mailgen/',
})
