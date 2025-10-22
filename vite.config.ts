import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Base public path - use '/' for root domain
  base: '/',

  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',

    // Enable minification
    minify: 'esbuild',

    // Generate sourcemaps for debugging (set to false if you don't need them)
    sourcemap: false,

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,

    // Rollup options for better optimization
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: undefined,
      },
    },
  },

  // Server configuration for development
  server: {
    port: 3000,
    open: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
  },
})
