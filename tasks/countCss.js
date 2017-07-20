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

var fs = require('fs');
const gulp = require('gulp-help')(require('gulp'));
var table = require('markdown-table');
const config = require('./config');
const rename = require('gulp-rename');
const through = require('through2');

//Define our Byte Sizes
const byteSizes = ["B", "KB", "MB", "GB", "TB"];

// Define our file sizes array for our markdown table
const fileSizes = [];

function countCss() {
  return gulp.src([
    config.dest.css + '**/page.css',
    config.dest.css + 'core.css'
  ])
    .pipe(through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      // Count the number of Characters/Bytes in the file
      const numChars = file.contents.toString().length;
      let size = 0;
      let exponent = 0;
      if(numChars > 0) {
        exponent = Math.min(Math.floor(Math.log10(numChars) / 3), byteSizes.length - 1);
        size = Number(numChars / Math.pow(1000, exponent)).toPrecision(4);
      }

      // Add to our fileSizes
      const filePath = file.path.replace(`${file.cwd}/dist/css/`, '');
      fileSizes.push([
        filePath,
        `${numChars}`,
        `${size} ${byteSizes[exponent]}`
      ]);

      cb(null, file);
    })).on('end', () => {
      // Organize our file sizes by path and alphabetically
      fileSizes.sort((a, b) => {
        aSplit = a[0].split('/');
        bSplit = b[0].split('/');

        if(aSplit.length <= 1 && bSplit.length > 1) {
          return -1;
        } else {
          if (a[0] > b[0]) {
            return 1;
          } else {
            return -1;
          }
        }
      });

      // Add our header to the table
      fileSizes.unshift([
        "Filename",
        "Number of Characters",
        "Size"
      ]);

      // Create/Ouput our final sizes file
      fs.writeFileSync('css/CSS_SIZES.md', table(fileSizes));
    });
}

gulp.task('countcss', 'Count the amount of characters in the CSS of pages and templates.', countCss);
