module.exports = {
  context: {
    button: {
      element: 'a',
      type: null,
      href: '#',
      anchor: null,
      modifier: null,
      label: 'Button label',
      data: null,
      hasIcon: false,
    },
  },
  variants: [{
    name: 'large',
    context: {
      button: {
        modifier: 'large',
        label: 'Large button',
      },
    },
  }],
};
