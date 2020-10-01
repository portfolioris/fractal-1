module.exports = {
  plugins: {
    'postcss-logical': {
      preserve: true,
    },
    'postcss-dir-pseudo-class': {},
    autoprefixer: {},
    'postcss-pxtorem': {
      propList: ['*'],
      minPixelValue: 4,
    },
  },
};
