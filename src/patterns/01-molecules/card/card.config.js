const { loremIpsum } = require('lorem-ipsum');

module.exports = {
  context: {
    heading: 'Heading of the card',
    description: loremIpsum(20),
    button: {
      element: 'span',
      label: 'Read more',
    },
  },
};
