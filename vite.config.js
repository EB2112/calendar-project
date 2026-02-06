import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1', // Use the explicit IPv4 address instead of 'localhost'
    port: 3000,
    strictPort: true, // Fail if the port is already in use
  },
  plugins: [react()]
})
