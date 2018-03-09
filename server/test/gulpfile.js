var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var path = require('path');

function serverPreTest() {
  return gulp.src(['../src/**/*.js'], {cwd: __dirname})
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
};

function serverTest() {
  return gulp.src('./**/*Test.js', {cwd: __dirname})
    .pipe(mocha({reporter: 'progress'}))
    .pipe(istanbul.writeReports({dir: path.join(__dirname, 'coverage')}));
};

gulp.task('server-test', gulp.series(serverPreTest, serverTest));
gulp.task('test', gulp.series('server-test'));
