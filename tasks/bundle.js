/**
 * Copyright 2017 The AMPStart Authors. All Rights Reserved.
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
const exec = require('child_process').execSync;
const jsdom = require('jsdom');
const path = require('path');
const fs = require('fs');
const config = require('./config');

const resources = [];

function collectResources(filepath, html, done) {
  const filename = path.basename(filepath, '.amp.html');
  const env = jsdom.env(html, function(err, window) {
    const ampimgs = window.document.querySelectorAll('amp-img[src]');
    const imgs = [].slice.call(ampimgs).map(function(el) {
      const src = el.getAttribute('src');
      const abspath = path.resolve(path.dirname(filepath), src);
      return abspath.replace(process.cwd() + '/', '');
    });
    const name = filepath.replace(process.cwd() + '/', '');
    exec(`tar -zcf dist/archive/${filename}.tar.gz ${name} ${imgs.join(' ')}`);
    done();
  });
}


function bundle() {
  try {
    fs.mkdirSync('dist/archive');
  } catch(e) {}
  return gulp.src(config.dest.templates + '/templates/**/*.html')
      .pipe(through.obj(function(file, enc, cb) {
        if (file.isNull()) {
          cb(null, file);
          return;
        }
        const resources = collectResources(
            file.path, file.contents.toString(), cb.bind(null, null, file));
      }));
}

gulp.task('bundle', bundle);
