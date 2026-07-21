import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite config: React plugin handles JSX/Fast Refresh,
// Tailwind plugin gives us zero-config Tailwind v4 (no separate postcss.config needed)
export default defineConfig({
  plugins: [react(), tailwindcss()],
})