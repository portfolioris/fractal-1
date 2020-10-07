module.exports = {
  plugins: {
    'postcss-dir-pseudo-class': {},
    'postcss-logical': {
      preserve: true,
    },
    autoprefixer: {},
    'postcss-pxtorem': {
      propList: ['*'],
      minPixelValue: 4,
    },
  },
};
