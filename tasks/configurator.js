
/* eslint-disable */
/**
 * Copyright 2017 The AMP Start Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gulp = require('gulp-help')(require('gulp'));
const config = require('./config');
const util = require('gulp-util');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const csstree = require('css-tree');
const rename = require('gulp-rename');
const through = require('through2');
const webpack = require("webpack");
const webpackProdConfig = require('../webpack.config.js')({
  prod: true
});
const webpackDevConfig = require('../webpack.config.js')({
  dev: true
});
const webpackTestConfig = require('../webpack.config.js')({
  test: true
});
const WebpackDevServer = require("webpack-dev-server");

function configuratorBuild() {

}

function configuratorWatch() {
  webpackDevConfig.entry.unshift("webpack-dev-server/client?http://localhost:8080");
  const webpackCompiler = webpack(webpackDevConfig);
  new WebpackDevServer(webpackCompiler, {
        publicPath: "/"
    }).listen(8080, "localhost", function(err) {
        if (err) {
          throw new util.PluginError("webpack-dev-server", err);
        }

        // Inform the user of the url they can reach the server
        util.log("[webpack-dev-server]", "Development Server: http://localhost:8080");
        util.log("[webpack-dev-server]", "Directory Listing for current server: http://localhost:8080/webpack-dev-server");
    });
}

function configuratorTest() {

}

function postCssWithVars() {
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
  ];
  const options = {};
  return gulp.src(config.src.css)
      .pipe(postcss(plugins, options))
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
        path.extname = ".json";
      }))
      .pipe(gulp.dest(config.dest.uncompiled_css))
}


gulp.task('configurator:watch', configuratorWatch);
gulp.task('configurator:css', postCssWithVars);
gulp.task('configurator:json', cssVarsJson);
