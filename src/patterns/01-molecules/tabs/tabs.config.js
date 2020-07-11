const { LoremIpsum } = require('lorem-ipsum');

const lorem = new LoremIpsum();
lorem.format = ('html');

module.exports = {
  context: {
    tabs: [
      {
        firstTab: true,
        tabHeading: 'Intro',
        content: lorem.generateParagraphs(4),
      },
      {
        tabHeading: 'Second tab',
        content: lorem.generateParagraphs(4),
      },
      {
        tabHeading: 'Third tab',
        content: lorem.generateParagraphs(4),
      },
      {
        tabHeading: 'Final tab',
        content: lorem.generateParagraphs(4),
      },
    ],
  },
};
