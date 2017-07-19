const gulp = require('gulp-help')(require('gulp'));
const browserSync = require('browser-sync');
const spa = require('browser-sync-spa');

const browserSyncConf = require('./conf/browsersync.conf');
const browserSyncDistConf = require('./conf/browsersync-dist.conf');

browserSync.use(spa());

gulp.task('browsersync', 'Serve the application using browser sync', browserSyncServe);
gulp.task('browsersync:dist', 'Serve the built (dist/) application using browser sync', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init(browserSyncConf());
  done();
}

function browserSyncDist(done) {
  browserSync.init(browserSyncDistConf());
  done();
}
