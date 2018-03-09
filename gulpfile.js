var gulp = require('gulp');
require('./client/gulpfile.js');

gulp.task('build', gulp.series('client-build'));

var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
function test() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'progress'}));
};

gulp.task('test', test);

gulp.task('default', gulp.series('build'));
