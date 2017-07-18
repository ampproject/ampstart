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
const extReplace = require('gulp-ext-replace');
const intercept = require('gulp-intercept');

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
      .pipe(intercept(function(file) {
        if (file.contents) {
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
          return file;
        }
      }))
      .pipe(extReplace('.json'))
      .pipe(gulp.dest(config.dest.uncompiled_css))
}

gulp.task('configurator:css', postCssWithVars);
gulp.task('configurator:json', cssVarsJson);
