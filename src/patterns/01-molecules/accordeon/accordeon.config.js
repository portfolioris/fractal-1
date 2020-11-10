const faker = require('faker');

const list = (length) => Array.from({ length });

module.exports = {
  context: {
    items: list(5).map(() => ({
      heading: faker.lorem.sentence(),
      content: `<p>${faker.lorem.paragraphs().split('\n').join('</p><p>')}</p>`,
    })),
  },
};
