const fs = require('fs-extra');
const { config } = require('../package.json');

/**
 * This copies assets for source dir to public.
 */
fs.copy(
  config.paths.source.static,
  config.paths.dist.static,
  (err) => {
    if (err) {
      console.log('An error occured while copying the folder.')
      return console.error(err)
    }
    console.log('Static assets copied.');
  },
);
