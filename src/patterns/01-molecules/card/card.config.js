const { loremIpsum } = require('lorem-ipsum');

module.exports = {
  context: {
    heading: 'Heading of the card',
    description: loremIpsum(20),
    button: {
      element: 'span',
      label: 'Read more',
    },
    image: {
      width: 200,
      height: 100,
      isLazy: true,
      alt: 'a placeholder',
      src: '//placehold.it/200x100',
      srcset: [
        {
          src: '//placehold.it/200x100',
          width: 200,
        },
        {
          src: '//placehold.it/400x200',
          width: 400,
        },
        {
          src: '//placehold.it/600x300',
          width: 600,
        },
        {
          src: '//placehold.it/800x400',
          width: 800,
        },
      ],
    },
  },
};
