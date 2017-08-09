const conf = require('./tasks/config');

module.exports = function (config) {
  const configuration = {
    basePath: conf.src.configurator,
    singleRun: true,
    autoWatch: false,
    logLevel: 'INFO',
    browsers: [
      'Chrome'
    ],
    frameworks: [
      'mocha'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      `${conf.src.configurator}/index.spec.js`
    ],
    preprocessors: {
      [`${conf.src.configurator}/index.spec.js`]: [
        'webpack'
      ]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    webpack: require('./webpack.config.js')({
      test: true
    }),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-mocha'),
      require('karma-webpack')
    ]
  };

  config.set(configuration);
};
