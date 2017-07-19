process.env.NODE_ENV = 'test';

const path = require('path');

const gulp = require('gulp-help')(require('gulp'));
const karma = require('karma');

gulp.task('karma:single-run', 'Run Tests for application', karmaSingleRun);
gulp.task('karma:auto-run', 'Run Tests for application, and watch for changes to re-run', karmaAutoRun);

function karmaFinishHandler(done) {
  return failCount => {
    done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
  };
}

function karmaSingleRun(done) {
  const configFile = path.join(process.cwd(), 'tasks/configurator/conf', 'karma.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaAutoRun(done) {
  const configFile = path.join(process.cwd(), 'tasks/configurator/conf', 'karma-auto.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}
