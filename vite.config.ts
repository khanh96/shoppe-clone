import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true // Bật sourcemap để nhìn được css ở vị trí nào (https://vitejs.dev/config/shared-options.html)
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
