module.exports = {
  context: {
    isHorizontal: false,
    items: [
      {
        icon: {
          icon: 'magnifier',
        },
        term: 'duration',
        definition: '3 weeks',
      },
      {
        icon: {},
        term: 'difficulty',
        definition: 'expert',
      },
    ],
  },
  variants: [
    {
      name: 'horizontal',
      context: {
        isHorizontal: true,
      },
    },
  ],
};
