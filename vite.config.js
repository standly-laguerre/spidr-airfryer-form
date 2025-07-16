import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/spidr-airfryer-form/', // ← this tells Vite to build for your repo subpath
})
