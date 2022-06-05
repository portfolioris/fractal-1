// const faker = require('faker');
const { loremIpsum } = require('lorem-ipsum');

const list = (length) => Array.from({ length });

module.exports = {
  context: {
    items: list(5).map(() => ({
      // heading: faker.lorem.sentence(),
      heading: loremIpsum(),
      content: loremIpsum({
        // count: 2,
        format: 'html',
        units: 'paragraphs',
        // sentenceUpperBound: 3,
      }),
      // content: `<p>${faker.lorem.paragraphs().split('\n').join('</p><p>')}</p>`,
    })),
  },
};

