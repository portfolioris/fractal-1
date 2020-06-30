module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-normalize': {},
    'postcss-pxtorem': {
      propList: ['*'],
      minPixelValue: 4,
    },
  },
};
