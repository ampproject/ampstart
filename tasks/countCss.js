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
const rename = require('gulp-rename');
const through = require('through2');

//Define our Byte Sizes
const byteSizes = ["B", "KB", "MB", "GB", "TB"];

function countCss() {
  return gulp.src(config.src.css)
    .pipe(through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      // Count the number of Characters/Bytes in the file
      const numChars = file.contents.toString().length;
      const exponent = Math.min(Math.floor(Math.log10(numChars) / 3), byteSizes.length - 1);
      const size = Number(numChars / Math.pow(1000, exponent)).toPrecision(4);
      file.contents =
        new Buffer(`File name: ${file.relative}\n` +
          `Number of characters: ${numChars}\n` +
          `Size: ${size} ${byteSizes[exponent]}`);
      cb(null, file);
    }))
    .pipe(rename(function(path) {
      path.basename = `size-${path.basename}`;
      path.extname = ".txt";
    }))
    .pipe(gulp.dest(config.dest.css));
}

gulp.task('countcss', 'Count the amount of characters in the CSS of pages and templates.', countCss);
