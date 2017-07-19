const gulp = require('gulp-help')(require('gulp'));
const gutil = require('gulp-util');

const webpack = require('webpack');
const webpackConf = require('./conf/webpack.conf');
const webpackDistConf = require('./conf/webpack-dist.conf');
const gulpConf = require('./conf/gulp.conf');

gulp.task('webpack:dev', 'Bundle Configurator using dev webpack config', done => {
  webpackWrapper(false, webpackConf, done);
});

gulp.task('webpack:watch', 'Watch files for changes, and bundle when changes occur', done => {
  webpackWrapper(true, webpackConf, done);
});

gulp.task('webpack:dist', 'Bundle Configurator using dist webpack config', done => {
  process.env.NODE_ENV = 'production';
  webpackWrapper(false, webpackDistConf, done);
});

function webpackWrapper(watch, conf, done) {
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gulpConf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));
    if (done) {
      done();
      done = null;
    }
  };

  if (watch) {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}
