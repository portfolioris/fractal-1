const nodemon = require('nodemon');
const config = require('../patternlab.config.json');

/**
 * Runs a nodemon task with variables.
 * This collects all svg files in svg source path,
 * builds a sprite,
 * and watches for changes to the svg source files.
 */
nodemon(`-e svg  --watch ${config.paths.assets.svg}  --exec "svgstore ${config.paths.assets.svg}*.svg | svgo --disable=cleanupIDs -i - -o ${config.paths.public.svg}sprite.svg"`);
