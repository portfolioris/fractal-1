const { LoremIpsum } = require('lorem-ipsum');

const lorem = new LoremIpsum();
lorem.format = 'html';

module.exports = {
  context: {
    tabs: [
      {
        firstTab: true,
        tabHeading: 'Intro',
        id: 'intro',
        content: lorem.generateParagraphs(4),
      },
      {
        tabHeading: 'Second tab',
        id: 'second',
        content: lorem.generateParagraphs(4),
      },
      {
        tabHeading: 'Third tab',
        id: 'third',
        content: lorem.generateParagraphs(4),
      },
      {
        tabHeading: 'Final tab',
        id: 'final',
        content: lorem.generateParagraphs(4),
      },
    ],
  },
};
