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
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');

function postcsswithvars() {
  const plugins = [
    require('postcss-import')(),
    require('autoprefixer')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-custom-properties')({
      preserve: true,
      appendVariables: true
    }),
    require('postcss-discard-comments')(),
    require('postcss-custom-media')(),
  ];
  const options = {};
  return gulp.src(config.src.css)
      .pipe(postcss(plugins, options))
      .pipe(replace('!important', ''))
      .pipe(gulp.dest(config.dest.configurator.css))
}

function cssvarsjson() {

}

gulp.task('configurator:css', postcsswithvars);
gulp.task('configurator:json', cssvarsjson);
