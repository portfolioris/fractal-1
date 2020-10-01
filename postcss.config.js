module.exports = {
  plugins: {
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
