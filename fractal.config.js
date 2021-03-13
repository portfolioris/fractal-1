const fractal = require('@frctl/fractal').create();

fractal.set('project.title', 'FooCorp Component Library');
fractal.components.set('path', `${__dirname}/src/patterns`);
fractal.web.set('builder.dest', `${__dirname}/public`);

module.exports = fractal;
