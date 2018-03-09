var gulp = require('gulp');
require('./client/gulpfile.js');

gulp.task('build', gulp.series('client-build'));
gulp.task('default', gulp.series('build'));
