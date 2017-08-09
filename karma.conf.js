const conf = require('./tasks/config');

module.exports = function (config) {
  const configuration = {
    basePath: '.',
    singleRun: true,
    autoWatch: false,
    autoWatchBatchDelay: 500,
    logLevel: 'INFO',
    browsers: [
      'Chrome'
    ],
    frameworks: [
      'mocha'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      `${conf.src.configurator}/**/*.spec.js`
    ],
    preprocessors: {
      [`${conf.src.configurator}/**/*.spec.js`]: [
        'webpack'
      ]
    },
    reporters: ['progress'],
    webpack: require('./webpack.config.js')({
      test: true
    }),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-mocha'),
      require('karma-webpack'),
      require('karma-chrome-launcher')
    ]
  };

  // Get our passed args
  const args = process.argv;

  // Check the passed client args
  // http://karma-runner.github.io/1.0/config/configuration-file.html
  if (args.includes('--auto-watch')) {
    configuration.singleRun = false;
    configuration.autoWatch = true;
  }

  config.set(configuration);
};
