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
const util = require('gulp-util');
const exec = require('child_process').execSync;
const jsdom = require('jsdom');
const through = require('through2');
const path = require('path');
const fs = require('fs-extra');
const config = require('./config');
const cssbeautify = require('cssbeautify');

function collectResources(filepath, html, done) {
  const filename = path.basename(filepath, '.amp.html');
  const env = jsdom.env(html, function(err, window) {
    const css = window.document.querySelector('style[amp-custom]').textContent;
    const ampimgs = window.document.querySelectorAll('amp-img[src]');
    // This can most likely be done with the amp-img scan but separating
    // out for now.
    let srcsetimgs = window.document.querySelectorAll('amp-img[srcset]');
    srcsetimgs = [].concat.apply([], [].slice.call(srcsetimgs)
        .map(function(ampimg) {
          return ampimg.getAttribute('srcset')
              .split(',').map(function(pair) {
                const src = pair.trim().split(' ')[0];
                if (src.indexOf('http://') == 0 ||
                    src.indexOf('https://') == 0 ||
                    src.indexOf('www.') == 0) {
                  return false;
                }
                const abspath = path.resolve(path.dirname(filepath), src);
                return abspath.replace(`${process.cwd()}/`, '');
              });
        }));
    const imgs = [].slice.call(ampimgs).map(function(el) {
      const src = el.getAttribute('src');
      if (src.indexOf('http://') == 0 ||
          src.indexOf('https://') == 0 ||
          src.indexOf('www.') == 0) {
        return false;
      }
      const abspath = path.resolve(path.dirname(filepath), src);
      return abspath.replace(`${process.cwd()}/`, '');
    });
    const name = filepath.replace(`${process.cwd()}/`, '');
    imgs.push.apply(imgs, srcsetimgs);
    imgs.forEach(function(imgpath) {
      imgpath &&
      fs.copySync(imgpath, `.archive/${imgpath.replace(/^dist/, filename)}`);
    });
    const pathToTmpl = filepath.replace(/.*templates\/(.*)/, '\$1');
    fs.copySync(filepath,
        `.archive/${filename}/templates/${pathToTmpl}`);
    if (css) {
      fs.mkdirSync(`.archive/${filename}/css`);
      fs.writeFileSync(`.archive/${filename}/css/${filename}.max.css`,
          cssbeautify(css, {indent: '  '}));
    }
    fs.writeFileSync(`.archive/${filename}/LICENSE`, licenses);
    exec(`cd .archive && zip -r ../dist/archive/${filename}.zip ${filename}/`);
    done();
  });
}


function bundle() {
  fs.removeSync('.archive');
  fs.mkdirSync('.archive');

  fs.removeSync('dist/archive');
  fs.mkdirSync('dist/archive');

  return gulp.src(`${config.dest.templates}/templates/**/*.html`)
      .pipe(through.obj(function(file, enc, cb) {
        if (file.isNull()) {
          cb(null, file);
          return;
        }
        const resources = collectResources(
            file.path, file.contents.toString(), cb.bind(null, null, file));
      })).on('end', function() {
        fs.removeSync('.archive');
      });
}

gulp.task('bundle', bundle);

const licenses = `
Basscss | https://github.com/basscss/basscss/blob/master/LICENSE.md
----------------------------------------------------------------------------

# The MIT License (MIT)

Copyright © Nicolas Gallagher and Jonathan Neal

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Normalize.css | https://github.com/necolas/normalize.css/blob/master/LICENSE.md
----------------------------------------------------------------------------
# The MIT License (MIT)
Copyright (c) 2013 – 2016 Brent Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


AMP Start | https://github.com/ampproject/ampstart/blob/master/LICENSE
----------------------------------------------------------------------------
Copyright 2017 The AMP Start Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;
