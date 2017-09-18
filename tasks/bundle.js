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
const replace = require('gulp-replace');
const zip = require('gulp-zip');
const exec = require('child_process').execSync;
const jsdom = require('jsdom');
const through = require('through2');
const path = require('path');
const fs = require('fs-extra');
const es = require('event-stream');
const config = require('./config');
const cssbeautify = require('cssbeautify');
const runSequence = require('run-sequence');

function collectResources(filepath, html, templateName, done) {
  const env = jsdom.env(html, function(err, window) {
    const ampCustom = window.document.querySelector('style[amp-custom]');
    const css = ampCustom && ampCustom.textContent || '';
    const ampimgs = window.document.querySelectorAll('amp-img[src]');
    // This can most likely be done with the amp-img scan but separating
    // out for now.
    var srcsetimgs = window.document.querySelectorAll('amp-img[srcset]');
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
      if (imgpath) {
        let imgFile = imgpath.split('img/')[1];
        const dest = `.archive/${templateName}/img/${imgFile}`;
        fs.copySync(imgpath, dest);
      }
    });
    let pathToTmpl = filepath.replace(/.*templates\/(.*)/, '\$1');
    pathToTmpl = pathToTmpl.replace(templateName + '/', 'templates/');
    fs.copySync(filepath,
        `.archive/${templateName}/${pathToTmpl}`);
    fs.copySync(filepath,
        `.archive/${templateName}/${pathToTmpl}`);
    fs.writeFileSync(`.archive/${templateName}/LICENSE`, licenses);
    done();
  });
}

function packageCSS() {
  const cssFolders = getFolders(`${config.dest.css}/templates/`);
  const tasks = cssFolders.map(function(folder) {
    return gulp.src(`${config.dest.css}/templates/${folder}/*.css`)
      .pipe(through.obj(function(file,enc,cb) {
        console.log('Packaging CSS: ', folder);
        file.contents = new Buffer(
          cssbeautify(file.contents.toString(), {indent: '  '}));
        cb(null, file);
      }))
      .pipe(gulp.dest(`.archive/${folder}/css/`))
  });

  return es.concat.apply(null, tasks);
}

function packageAPIs() {
  const templateFolders = getFolders(`${config.dest.templates}/templates/`);
  const tasks = templateFolders.map(function(folder) {
    return gulp.src(`${config.dest.templates}/templates/${folder}/api/*.json`)
      .pipe(gulp.dest(`.archive/${folder}/templates/api/`));
  });
  return es.concat.apply(null, tasks);
}

function fixImagePaths() {
  const archiveFolders = getFolders(`.archive/`);
  const tasks = archiveFolders.map(function(folder) {
    return gulp.src(`.archive/${folder}/templates/**/*.amp.html`)
      .pipe(replace('&#x2F;', '/'))
      .pipe(replace('../../img/', '../img/'))
      .pipe(gulp.dest(`.archive/${folder}/templates`));
  });
  return es.concat.apply(null, tasks);
}


function packageTemplates() {
  fs.removeSync('.archive');
  fs.mkdirSync('.archive');
  fs.removeSync('dist/archive');
  fs.mkdirSync('dist/archive');
  const templateFolders = getFolders(`${config.dest.templates}/templates/`);
  const tasks = templateFolders.map(function(folder) {
    return gulp.src(`${config.dest.templates}/templates/${folder}/*.amp.html`)
    .pipe(through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }
      console.log('Bundling: ', folder);
      const resources = collectResources(
          file.path, file.contents.toString(), folder, cb.bind(null, null, file));
      console.log('Finished Bundling: ', folder);
    }));
  });

  return es.concat.apply(null, tasks);
}

function archive() {
  const archiveFolders = getFolders(`.archive/`);
  const tasks = archiveFolders.map(function(folder) {
    return gulp.src(`.archive/${folder}/**/*`)
      .pipe(zip(`${folder}.zip`))
      .pipe(gulp.dest('dist/archive'));
  });
  return es.concat.apply(null, tasks);
}

function getFolders(dir){
  return fs.readdirSync(dir).filter(function(file){
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}



function bundle_v2() {
  packageTemplates();
  packageCSS();
  archive();
}

gulp.task('_packageTemplates', packageTemplates);
gulp.task('_fixImgPaths', ['_packageTemplates'], fixImagePaths);
gulp.task('_packageCSS', ['_fixImgPaths'] ,packageCSS);
gulp.task('_packageAPIs', ['_packageCSS'] ,packageAPIs);
gulp.task('_archive',  ['_packageAPIs'], archive)

gulp.task('bundle', ['_archive'], function(done) {
  fs.removeSync('.archive');
  done();
});

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
