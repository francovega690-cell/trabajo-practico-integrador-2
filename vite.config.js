import react from '@vitejs/plugin-react'
// Plugin oficial de Tailwind v4 para Vite: procesa las clases utilitarias
// sin necesidad de tailwind.config.js ni postcss.config.js
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
