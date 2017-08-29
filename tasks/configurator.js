
/* eslint-disable */
/**
 * Copyright 2017 The AMP Start Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS-IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gulp = require('gulp-help')(require('gulp'));
const config = require('./config');
const util = require('gulp-util');
const runSequence = require('run-sequence');
const postcss = require('postcss');
const gulpPostcss = require('gulp-postcss');
const replace = require('gulp-replace');
const csstree = require('css-tree');
const rename = require('gulp-rename');
const through = require('through2');
const webpack = require('webpack');
const webpackProdConfig = require('../webpack.config.js')({
  prod: true
});
const webpackDevConfig = require('../webpack.config.js')({
  dev: true
});
const webpackTestConfig = require('../webpack.config.js')({
  test: true
});
const WebpackDevServer = require('webpack-dev-server');
const KarmaServer = require('karma').Server;
const argv = require('minimist')(process.argv.slice(2));

const CONFIGURATOR_PORT = 8080;

function configuratorWebpackProd() {
  webpack(webpackProdConfig, function(err, stats) {
    if (err) {
      throw new util.PluginError('webpack', err);
    }

    // Output the webpack stats
    util.log('[webpack]', stats.toString({}));
  });
}

function runWebpackDevServer(webpackConfig) {
  if(webpackConfig.entry && Array.isArray(webpackConfig.entry)) {
    webpackConfig.entry.unshift(`webpack-dev-server/client?http://localhost:${argv.port || CONFIGURATOR_PORT}`);
  }
  const webpackCompiler = webpack(webpackConfig);
  new WebpackDevServer(webpackCompiler, {
        publicPath: '/'
    }).listen(argv.port || CONFIGURATOR_PORT, 'localhost', function(err) {
        if (err) {
          throw new util.PluginError('webpack-dev-server', err);
        }

        // Inform the user of the url they can reach the server
        util.log('[webpack-dev-server]', `Development Server: http://localhost:${argv.port || CONFIGURATOR_PORT}`);
        util.log('[webpack-dev-server]', `Directory Listing for current server: http://localhost:${argv.port || CONFIGURATOR_PORT}/webpack-dev-server`);
    });
}

function configuratorServe() {
  runWebpackDevServer(webpackDevConfig);
}

function configuratorWatchProd() {
  return gulp.watch(
      [
        `${config.src.configurator}/**/*`
      ],
      function(event) {
        runSequence('configurator:webpack');
      });
}

function runKarma(options, callback) {

  // Parse our karma config
  karmaServerConfig = {
    configFile: `${__dirname}/../karma.conf.js`
  };

  // Pass in our options
  karmaServerConfig = Object.assign({}, karmaServerConfig, options)

  new KarmaServer(karmaServerConfig, callback).start();
}

function configuratorTest(callback) {
  runKarma({}, callback);
}

function configuratorTestWatch(callback) {
  runKarma({
    singleRun: false,
    autoWatch: true
  }, callback);
}

function postCssWithVars() {
  // Filtering out warning messages
  const silentPostCSS = postcss.plugin('messages', () => (css, result) => {
    const warnings = result.warnings();
    result.messages = result.messages.filter(msg => msg.type !== 'warning');
  });

  const plugins = [
    require('postcss-import')(),
    require('autoprefixer')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-custom-properties')({
      preserve: true,
      appendVariables: true,
    }),
    require('postcss-discard-comments')(),
    require('postcss-custom-media')(),
    silentPostCSS()
  ];
  const options = {};
  const gulpConfiguratorCssSrc = config.src.css;
  gulpConfiguratorCssSrc.push('!css/**/_*.css');

  return gulp.src(config.src.css)
      .pipe(gulpPostcss(plugins, options))
      .pipe(replace('!important', ''))
      .pipe(gulp.dest(config.dest.uncompiled_css))
}

function cssVarsJson() {
  return gulp.src(config.dest.uncompiled_css + '/**/*.css')
      .pipe(through.obj(function(file, enc, cb) {
        if(file.isNull()) {
          cb(null, file);
          return;
        }
        const cssVarObj = {};
        const ast = csstree.parse(file.contents.toString());
        csstree.walk(ast, function(node) {
          if(node.type === 'Declaration' && node.property.indexOf('--') === 0) {
            cssVarObj[node.property] = {
              value: node.value.value
            }
          }
        });
        // Place the json into the file
        file.contents = new Buffer(JSON.stringify(cssVarObj, null, 2));
        cb(null, file);
      }))
      .pipe(rename(function(path) {
        path.extname = '.json';
      }))
      .pipe(gulp.dest(config.dest.uncompiled_css))
}

// Define our gulp tasks
gulp.task('configurator', 'Runs the default, configurator:build for prod deployment', ['configurator:build']);
gulp.task('configurator:build', 'Builds the configurator for deployment, analyzes the templates css, converts to json, and then builds the configurator webapp', ['configurator:css', 'configurator:json', 'configurator:webpack']);
gulp.task('configurator:webpack', 'Builds only the configurator webapp using webpack, and passing the prod environment', configuratorWebpackProd);
gulp.task('configurator:serve', 'Opens a dev server at localhost:8080 for the configurator, and watches/livreloads on changes. Port can be changed with --port="PORT_NUMBER_HERE"', configuratorServe);
gulp.task('configurator:watch', 'Watches the configurator src directory, and runs prod webpack builds on changes. Useful for eveloping both the configurator and ampstart', configuratorWatchProd);
gulp.task('configurator:test', 'Runs the tests for configurator, only once', configuratorTest);
gulp.task('configurator:test:watch', 'Runs and watches the tests for the configurator', configuratorTestWatch);
gulp.task('configurator:css', 'Runs postcss on templates, and preserves their variables', postCssWithVars);
gulp.task('configurator:json', 'Converts CSS from configurator:css, into digestable JSON by the configurator webapp', cssVarsJson);
