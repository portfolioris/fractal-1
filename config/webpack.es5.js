const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../package.json').config;

module.exports = merge(common, {
  entry: {
    bundle: `./${config.paths.source.js}entry.legacy.js`,
  },
  output: {
    filename: '[name].es5.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  debug: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});
