const nodemon = require('nodemon');
const config = require('../patternlab.config.json');

/**
 * Runs a nodemon task with variables.
 * This watches patterns in the configured patterns folder.
 */
nodemon(`-e hbs,md,json  --watch ${config.paths.source.patterns}  scripts/pl.partial-build.js`);
