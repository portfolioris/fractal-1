const config = require('../patternlab.config.json');
const patternlab = require('@pattern-lab/core')(config);

patternlab.build({
  cleanPublic: true,
});
