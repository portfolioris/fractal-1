const fractal = require('@frctl/fractal').create();

// fractal.set('project.title', 'Fractal 1');
fractal.components.set('path', `${__dirname}/src/patterns`);
// fractal static files folder
fractal.web.set('static.path', `${__dirname}/dist`);
fractal.web.set('builder.dest', `${__dirname}/fractal_export`);

if (process.env.ENV === 'development') {
  fractal.set('project.isDevelop', 'true');
}

module.exports = fractal;
