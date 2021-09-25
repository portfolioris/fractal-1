const nodemon = require('nodemon');
const pkgJson = require('../package.json');
const config = pkgJson.config;

/**
 * Runs a nodemon task with variables.
 * This collects all svg files in svg source path,
 * builds a sprite,
 * and watches for changes to the svg source files.
 */
nodemon(`-e svg  --watch ${config.paths.source.svg}  --exec "svgstore ${config.paths.source.svg}*.svg | svgo  -i -  --config scripts/svg.config.cjs  -o ${config.paths.dist.svg}sprite.svg"`);
