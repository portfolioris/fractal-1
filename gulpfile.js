const {
  series, parallel, src, dest, watch,
} = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const eslint = require('gulp-eslint');
// const notify = require('gulp-notify');
// const plumber = require('gulp-plumber');
const sass = require('gulp-dart-sass');
const tildeImporter = require('node-sass-tilde-importer');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const pkgJson = require('./package.json');
// const hbs = require('@frctl/handlebars');

const { config } = pkgJson;
const webpackConfigDev = require('./config/webpack.dev');
const webpackConfigES5 = require('./config/webpack.es5');
const webpackConfigES6 = require('./config/webpack.es6');


/* ----------------------------------------------------------------------------*\
    Internal Tasks
\*----------------------------------------------------------------------------*/

/*  Copy
\*----------------------------------------------------------------------------*/

/**
 * Task copy:assets
 */
const copyAssetsTask = () => (
  src(`${config.paths.source.assets}**/*`)
    .pipe(dest(config.paths.public.assets))
);


/**
 * Task copy:buildFiles
 */
const copyBuildTask = () => (
  src([
    `${config.paths.public.assets}**/*`,
    `${config.paths.public.svg}**/*`,
    `${config.paths.public.js}**/*`,
    `${config.paths.public.css}**/*`,
  ], { base: config.paths.public.root }) // this keeps the directory structure
    .pipe(dest(config.paths.build.root))
);


/*  Task: styles
    Tests for markup errors, compiles and autoprefixes the `scss` files
\*----------------------------------------------------------------------------*/

const stylesDevTask = () => (
  src([
    `${config.paths.source.sass}**/*.scss`,
    `${config.paths.source.patterns}**/*.scss`,
  ])
    .pipe(stylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
      syntax: 'scss',
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: tildeImporter,
      precision: 8,
      includePaths: ['src', 'node_modules'],
    }))
    .pipe(postcss())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.paths.public.css))
    // .pipe(browserSync.stream())
);

const stylesProdTask = () => (
  src(`${config.paths.source.sass}**/*.scss`)
    // .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter, // enable imports from /node_modules/ using tilde character
      precision: 8,
    }))
    .pipe(postcss()) // default postcss.config.js
    .pipe(postcss([ // extra: minification
      cssnano(),
    ]))
    .pipe(dest(config.paths.public.css))
);


/*  Task: javascript
    Checks our own javascript files for potential errors.
\*----------------------------------------------------------------------------*/

// Lint scripts
const javascriptLintTask = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    // .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  cb();
};


const javascriptDevTask = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    // .pipe(plumber())
    .pipe(webpackStream(webpackConfigDev, webpack, (err, stats) => {
      // log errors and warnings
      if (stats.hasErrors() || stats.hasWarnings()) {
        console.log(stats.toString({ colors: true }));
        const info = stats.toJson();
        browserSync.notify(`Script error: ${info.errors}`, 10000);
      }
      // if there are no errors, reload
      if (!stats.hasErrors()) {
        // bsReloadTask(cb);
      }
    }))
    .pipe(dest(config.paths.public.js));
  cb();
};

const javascriptES6Task = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    // .pipe(plumber())
    .pipe(webpackStream(webpackConfigES6, webpack, () => cb()))
    .pipe(dest(config.paths.public.js));
};

const javascriptES5Task = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    // .pipe(plumber())
    .pipe(webpackStream(webpackConfigES5, webpack, () => cb()))
    .pipe(dest(config.paths.public.js));
};

const javascriptProdTask = parallel(
  javascriptES5Task,
  javascriptES6Task,
);


/*  Task: svg
\*----------------------------------------------------------------------------*/

const svgSpriteTask = () => (
  src('**/*.svg', { cwd: config.paths.source.svg })
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '.',
        },
      },
    }))
    .pipe(dest(config.paths.public.svg))
);


/*  Task: connect
    Fires up a development server using browserSync
\*----------------------------------------------------------------------------*/

const fractal = require('@frctl/fractal').create();

fractal.set('project.title', pkgJson.description); // title for the project
fractal.web.set('builder.dest', config.paths.build.root); // destination for the static export
fractal.docs.set('path', `${__dirname}/${config.paths.source.docs}`); // location of the documentation directory.
fractal.components.set('path', `${__dirname}/${config.paths.source.patterns}`); // location of the component directory.
fractal.web.set('static.path', path.join(__dirname, config.paths.public.root)); // static assets location

fractal.web.set('server.syncOptions', {
  files: [`${config.paths.public.root}**/*`],
});

const hbs = require('@frctl/handlebars')({
  helpers: {
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
      return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
  },
});

fractal.components.engine(hbs); /* set as the default template engine for components */
fractal.docs.engine(hbs); /* you can also use the same instance for documentation, if you like! */


// keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

const connectTask = () => {
  const server = fractal.web.server({
    sync: true,
  });
  server.on('error', (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
};

const buildStyleguide = (cb) => {
  fractal.web.set('builder.dest', `${__dirname}/${config.paths.build.root}`);
  const builder = fractal.web.builder();

  builder.build().then(() => {
    console.log('Fractal static HTML build complete.');
    cb();
  });
};

exports.buildStyleguide = buildStyleguide;


/*  Task: watch
    Setup files watches to track changes/additions/deletions of files and take
    action upon those changes
\*----------------------------------------------------------------------------*/

const watchTask = (cb) => {
  /**
   * Styles
   */
  watch([
    `${config.paths.source.sass}**/*.scss`,
    `${config.paths.source.patterns}**/*.scss`,
  ], series(stylesDevTask, copyBuildTask));

  /**
   * Javascripts
   */
  watch(`${config.paths.source.js}**/*.js`, series(javascriptLintTask, copyBuildTask));

  /**
   * SVG
   */
  watch(`${config.paths.source.svg}**/*.svg`, series(svgSpriteTask, copyBuildTask));


  /**
   * Assets (enable if your assets public path differs from the source)
   */
  watch(config.paths.source.assets, series(copyAssetsTask, copyBuildTask));

  cb();
};


/* ----------------------------------------------------------------------------*\
    External tasks
    Tasks which will be used from the command line. These tasks chain together
    all other tasks mentioned in this file.
\*----------------------------------------------------------------------------*/

/**
 * Build styleguide
 */
// const patternlabAssetsTask = parallel(
//   fullPatternlabTask,
//   copyStyleguideTask,
//   copyStyleguideCssTask,
//   copyAnnotationsTask,
// );

/**
 * task: serve
 * Prepares the code, fires up a development server and sets up watch tasks
 */
exports.serve = series(
  parallel(
    copyAssetsTask,
    svgSpriteTask,
    javascriptLintTask,
    javascriptDevTask,
    stylesDevTask,
  ),
  watchTask,
  connectTask,
);


/**
 * task: build
 * Build production SVG, JS & CSS bundles, copy assets
 */
exports.build = series(
  parallel(
    buildStyleguide,
    copyAssetsTask,
    svgSpriteTask,
    javascriptProdTask,
    stylesProdTask,
  ),
  copyBuildTask,
);
