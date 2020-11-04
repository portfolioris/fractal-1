/**
 * Import conditioner
 * As per: https://pqina.nl/conditioner/
 */
import * as conditioner from 'conditioner-core';

/* prettier-ignore */

/**
 * Configure conditioner to work with dynamic imports & webpack
 */
conditioner.addPlugin({
  // converts module aliases to paths
  moduleSetName: (name) => `${name}.js`,
  // get the module constructor
  moduleGetConstructor: (module) => module.default,
  // override the import
  moduleImport: (name) => import(
    /* https://webpack.js.org/api/module-methods/#import- */
    /* set to "eager" to create a single chunk for all modules */
    /* set to "lazy" to create a separate chunk for each module */
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    '../modules/' + name // eslint-disable-line
  ),
});

conditioner.addPlugin({
  // the plugin "monitor" hook
  monitor: {
    // the name of our monitor, not prefixed with "@"
    name: 'visible',

    // the monitor factory method, this will create our monitor
    create: (context, element) => ({
      // current match state
      matches: false,

      // called by conditioner to start listening for changes
      addListener(change) {
        new IntersectionObserver((entries) => {
          // update the matches state
          this.matches = entries.pop().isIntersecting === context;

          // inform conditioner of the new state
          change();
        }).observe(element);
      },
    }),
  },
});

/**
 * Fire up the modules!
 */
conditioner.hydrate(document.documentElement);
