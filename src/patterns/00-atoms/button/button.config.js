module.exports = {
  context: {
    element: 'a',
    type: null,
    href: '#',
    anchor: null,
    modifier: null,
    label: 'Button label',
    data: null,
    hasIcon: false,
  },
  variants: [
    {
      name: 'with icon',
      context: {
        hasIcon: true,
      },
    },
    {
      name: 'with icon reversed',
      context: {
        isReversed: true,
        hasIcon: true,
      },
    },
  ],
};
