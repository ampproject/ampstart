const path = require('path');

const gulp = require('gulp-help')(require('gulp'));
const filter = require('gulp-filter');

const conf = require('./conf/gulp.conf');

gulp.task('other', 'Copy Remaining Files to dist/', other);

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{css,js}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}
