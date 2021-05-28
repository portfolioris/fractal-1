const { exec } = require('child_process');
const pkgJson = require('../package.json');
const config = pkgJson.config;

exec(`svgstore ${config.paths.source.svg}*.svg | svgo  -i -  --config scripts/svg.config.cjs  -o ${config.paths.dist.svg}sprite.svg`);
