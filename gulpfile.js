/**
 * Copyright 2016 The AMPStart Authors. All Rights Reserved.
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
const del = require('del');
const Mustache = require('mustache');
const posthtml = require('gulp-posthtml');
const fs = require('fs');
const postcss = require('gulp-postcss');
const runSequence = require('run-sequence');
const config = require('./tasks/config');
const through = require('through2');
const path = require('path');
require('./tasks');

function getData(opt_path) {
  var path = 'data.json';
  var jsonPath = (opt_path || '').replace(/(?:(?:amp|snip).)?html$/, 'json');
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
    var partialsMap = Object.create(null);
    // TODO(erwinm, #47): only do this traverse once and cache all the paths
    traverse(__dirname, path.dirname(file.path), partialsMap);
    file.contents = new Buffer(Mustache.render(file.contents.toString(),
        getData(file.path), partialsMap));
    cb(null, file);
  });
}

function traverse(dir, embedderDir, partialsMap) {
  var files = fs.readdirSync(dir);
  var filename = null;
  var filepathOrDir = null;
  for (var i = 0; i < files.length; i++) {
    filename = files[i];
    filepathOrDir = `${dir}/${filename}`;
    if (fs.statSync(filepathOrDir).isDirectory()) {
      traverse(filepathOrDir, embedderDir, partialsMap);
    } else if (/snip.html$/.test(filepathOrDir)) {
      partialsMap[path.relative(embedderDir, filepathOrDir)] =
          fs.readFileSync(filepathOrDir).toString();
    }
  }
}

gulp.task('build', 'build', function(cb) {
  runSequence('clean', 'highlight', 'img', 'postcss', 'posthtml', 'www',
      'validate', cb);
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('img', function() {
  return gulp.src(config.src.img).pipe(gulp.dest(config.dest.img));
});


gulp.task('www', function() {
  const plugins = [
    require('posthtml-include')({
      encoding: 'utf-8'
    }),
    require('posthtml-inline-assets')({
      from: config.dest.www_pages,
      inline: {
        script: { check: function() { return false; } },
      }
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
    config.src.templates,
    config.src.www_pages,
    config.src.templates_css,
    config.src.css,
    config.src.data],
      ['build']);
});

gulp.task('default', ['build']);

gulp.task('posthtml', 'build kickstart files', function() {
  const plugins = [
    require('posthtml-inline-assets')({
      from: config.dest.templates,
      inline: {
        script: { check: function() { return false; } },
      }
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
    require('cssnano')(),
  ];
  const replace = require('gulp-replace');
  const options = {};
  return gulp.src(config.src.css)
    .pipe(postcss(plugins, options))
    .pipe(replace('!important', ''))
    .pipe(gulp.dest(config.dest.css))
});

function serve() {
  var app = require('express')();
  var webserver = require('gulp-webserver');

  var host = 'localhost';
  var port = process.env.PORT || 8000;
  var server = gulp.src(process.cwd())
      .pipe(webserver({
        port,
        host,
        directoryListing: true,
        livereload: true,
        https: false,
        middleware: [app],
      }));

  return server;
}

gulp.task('serve', serve);
