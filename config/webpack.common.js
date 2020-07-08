const { resolve } = require('path');
const { config } = require('../package.json');

module.exports = {
  mode: 'production',
  entry: {
    bundle: `./${config.paths.source.js}entry.js`,
  },
  devtool: 'source-map',
  output: {
    path: resolve(config.paths.public.js),
    publicPath: config.paths.public.jsPublicPath,
    filename: '[name].es6.js',
  },
};
