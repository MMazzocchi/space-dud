var gulp = require('gulp');
require('./client/gulpfile.js');
require('./test/gulpfile.js');

gulp.task('clean', gulp.series('client-clean'));
gulp.task('build', gulp.series('client-build'));
gulp.task('default', gulp.series('clean', 'build', 'test'));
