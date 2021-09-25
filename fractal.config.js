const { config } = require('./package.json');

const fractal = require('@frctl/fractal').create();
const instance = fractal.components.engine();

fractal.components.set('path', config.paths.source.patterns);
fractal.web.set('static.path', __dirname + config.paths.dist.root);
fractal.web.set('builder.dest', config.paths.export.root);
fractal.web.set('server.sync', true);

if (process.env.ENV === 'development') {
  instance.handlebars.registerHelper('static', (file) => `//localhost:${config.paths.source.vitePort}/${file}`);
  fractal.set('project.isDevelop', 'true');
} else {
  const manifest = require(`./${config.paths.dist.root}manifest.json`);
  instance.handlebars.registerHelper('manifest', (key, subkey) => `/${manifest[key][subkey]}`);
}

module.exports = fractal;