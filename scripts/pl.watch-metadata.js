const nodemon = require('nodemon');
const config = require('../patternlab.config.json');

/**
 * Runs a nodemon task with variables.
 * This watches data and meta folder in the configured patterns folder.
 */
nodemon(
  `-e json,hbs,mustache  --watch ${config.paths.source.data}  --watch ${config.paths.source.meta}  scripts/pl.full-build.js`
);
