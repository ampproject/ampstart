/**
 * Copyright 2016 The AMP Start Authors. All Rights Reserved.
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
const del = require('del');
const Mustache = require('mustache');
const posthtml = require('gulp-posthtml');
const postcss = require('gulp-postcss');
const runSequence = require('run-sequence');
const through = require('through2');
const fs = require('fs');
const path = require('path');
const config = require('./tasks/config');
const server = require('gulp-webserver');
require('./tasks');

const partialsMap = Object.create(null);

function getData(opt_path) {
  var path = 'data.json';
  var jsonPath = (opt_path || '').replace(/html$/, 'json');
  if (opt_path && jsonPath && fs.existsSync(jsonPath)) {
    path = jsonPath;
  }
  return JSON.parse(fs.readFileSync(path));
}

function mustacheStream() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    var partials = getPartials(partialsMap,
        path.dirname(file.path), file.contents.toString());
    file.contents = new Buffer(Mustache.render(file.contents.toString(),
        getData(file.path), partials));
    cb(null, file);
  });
}

function getPartials(acc, embedderDir, template) {
// Assume {{}} as mustache start/end tags
  const partialRegexp = new RegExp('{{>\\s*(\\S+)\\s*}}', 'g');
  var partialMatch = null;
  var partialPath = null;
  var partialTemplate = null;
  var absPathToTemplate = null;
  while ((partialMatch = partialRegexp.exec(template))) {
    partialPath = partialMatch[1];
    absPathToTemplate = path.resolve(embedderDir, partialPath);
    if (!acc[partialPath]) {
      try {
        partialTemplate = fs.readFileSync(absPathToTemplate).toString();
      } catch (e) {
        util.log(util.colors.red(e.message));
      }
      acc[partialPath] = partialTemplate;
    }
    getPartials(acc, path.dirname(absPathToTemplate), partialTemplate);
  }
  return acc;
}

gulp.task('build', 'build', function(cb) {
  runSequence('clean', 'highlight', 'img', 'postcss', 'posthtml', 'www',
      'validate', 'bundle', cb);
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('img', function() {
  return gulp.src(config.src.img).pipe(gulp.dest(config.dest.img));
});

function inlineCheckScript(node) {
  return false;
}

function inlineCheckStyle(node) {
  return node.tag === 'link' && node.attrs && node.attrs.rel === 'stylesheet' &&
      'amp-custom' in node.attrs && node.attrs.href;
}

const inlineTransformation = {
  script: {
    check: inlineCheckScript,
  },
  style: {
    check: inlineCheckStyle,
  }
}

gulp.task('www', function() {
  const plugins = [
    require('posthtml-include')({
      encoding: 'utf-8'
    }),
    require('posthtml-inline-assets')({
      from: config.dest.www_pages,
      inline: inlineTransformation,
    }),
  ];
  const options = {};
  return gulp.src(config.src.www_pages)
    .pipe(mustacheStream())
    .pipe(posthtml(plugins, options))
    .pipe(gulp.dest(config.dest.www_pages))
});

gulp.task('watch', 'watch stuff', ['build'], function() {
  return gulp.watch([
    config.src.components,
    config.src.templates,
    config.src.www_pages,
    config.src.css,
    config.src.data,
    config.src.img],
      ['build']);
});

gulp.task('default', ['build']);

gulp.task('posthtml', 'build kickstart files', function() {
  const plugins = [
    require('posthtml-inline-assets')({
      from: config.dest.templates,
      inline: inlineTransformation,
    }),
    require('posthtml-include')({ encoding: 'utf-8' }),
  ];
  const options = {};
  return gulp.src(config.src.templates)
    .pipe(mustacheStream())
    .pipe(posthtml(plugins, options))
    .pipe(gulp.dest(config.dest.templates))
});

gulp.task('postcss', 'build postcss files', function() {
  const plugins = [
    require('postcss-import')(),
    require('autoprefixer')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-custom-properties')(),
    require('postcss-discard-comments')(),
    require('postcss-custom-media')(),
    require('cssnano')({zindex: false}),
  ];
  const replace = require('gulp-replace');
  const options = {};
  return gulp.src(config.src.css)
    .pipe(postcss(plugins, options))
    .pipe(replace('!important', ''))
    .pipe(gulp.dest(config.dest.css))
});

gulp.task('serve', function() {
  gulp.src(config.dest.default)
    .pipe(server({
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'dist'
      },
    }));
});
