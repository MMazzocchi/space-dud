var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

function testServer() {
  return gulp.src('server/**/*.js', {cwd: __dirname})
    .pipe(mocha({reporter: 'progress'}));
};

gulp.task('server-test', testServer);
gulp.task('test', gulp.series('server-test'));
