import {defineConfig} from 'vite'
export default defineConfig({
  publicDir: 'src/static',
  server: {
    port: 30128,
  },
  build: {
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      // overwrite default .html entry
      input: [
        '/src/js/entry.js',
        '/src/sass/style.js'
      ],
    },
  },
});
