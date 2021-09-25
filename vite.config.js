export default {
  publicDir: 'src/static',
  server: {
    port: 30128,
  },
  build: {
    rollupOptions: {
      // overwrite default .html entry
      input: [
        '/src/js/entry.js',
        '/src/sass/style.scss'
      ],
    },
  },
};
