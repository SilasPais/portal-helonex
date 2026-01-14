
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Fix: Property 'cwd' does not exist on type 'Process'. Use process.cwd()
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    }
  }
})