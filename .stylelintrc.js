module.exports = {
  'extends': './node_modules/webpack-config-starterkit/node_modules/@supple-kit/stylelint-config-supple',
  'plugins': [
    'stylelint-use-logical',
  ],
  'rules': {
    'csstools/use-logical': true,
  },
};
