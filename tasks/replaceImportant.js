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
const through = require('through2');
const replaceImportant = require('replace-important');
const config = require('./config');
var gutil = require('gulp-util');

function gulpReplaceImportant() {
  return gulp.src(config.dest.css + '**/page.css')
    .pipe(through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }
      file.contents = new Buffer(replaceImportant(file.contents.toString()));
      cb(null, file);
    }))
    .pipe(gulp.dest(config.dest.css));
}

gulp.task('replace-important', gulpReplaceImportant);
