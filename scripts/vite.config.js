export default {
  build: {
    rollupOptions: {
      // overwrite default .html entry
      input: [
        '/src/js/entry.js',
        '/src/sass/style.scss'
      ],
      output: {
        entryFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      }
    },
  },
};
