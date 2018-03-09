var gulp = require('gulp');
require('./client/gulpfile.js');
require('./server/gulpfile.js');

gulp.task('clean', gulp.series('client-clean'));
gulp.task('build', gulp.series('client-build'));
gulp.task('test', gulp.series('server-test'));

gulp.task('default', gulp.series('client', 'test'));
