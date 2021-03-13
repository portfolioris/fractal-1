const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('webpack-config-starterkit');
// const config = require('./patternlab.config.json');
const { config } = require('./package.json');

const webpackConfig = merge(baseConfig, {
  entry: {
    // pl: `${config.paths.source.sass}pattern-scaffolding.scss`,
    style: `./${config.paths.source.sass}style.scss`,
    main: `./${config.paths.source.js}entry.js`,
  },
  output: {
    path: path.join(__dirname, config.paths.public.assets),
    publicPath: '/',
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  devServer: {
    contentBase: path.join(__dirname, config.paths.public.root),
  },
});

module.exports = webpackConfig;
