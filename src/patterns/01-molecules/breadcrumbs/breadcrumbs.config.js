module.exports = {
  context: {
    items: [
      {
        title: 'Home',
        href: '/',
        index: 1,
      },
      {
        title: 'Second level',
        href: '/second',
        index: 2,
      },
      {
        title: 'Parent level',
        href: '/second/parent',
        index: 3,
        isParent: true,
      },
      {
        title: 'Current level',
        href: '/second/parent/current',
        index: 4,
        isLast: true,
      },
    ],
    chevronRight: {
      icon: 'chevron-right',
    },
    chevronLeft: {
      icon: 'chevron-left',
    },
  },
};
