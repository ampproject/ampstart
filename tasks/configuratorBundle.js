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
 const source = require('vinyl-source-stream');
 const browserify = require('browserify');
 //https://github.com/babel/babelify

 function configuratorBundle() {

   const entryPoint = config.src.configurator_app + '/index.js';
  // https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-transforms.md
  const gulpBrowserify = browserify({
    entries: entryPoint,
    debug: true
  });
  
   return gulpBrowserify.bundle()
     .pipe(source('bundle.js'))
     .pipe(gulp.dest(config.dest.configurator_app));
 }

 gulp.task('configurator:bundle', 'Bundle dependencies for the configurator using browserify', configuratorBundle);
