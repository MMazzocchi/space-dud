var gulp = require('gulp');
var footer = require('gulp-footer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var del = require('del');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const DEPRECATED_FOOTER = "console.warn('This file has been deprecated, and "+
                          "will be removed in a future release.');"

function clean() {
  return del(path.join(DIST_DIR, '**.js'));
};

function bundle(in_file) {
  return browserify(path.join(SRC_DIR, in_file))
    .bundle()
    .pipe(source(in_file))
    .pipe(buffer());
};

function deprecate(stream) {
  return stream.pipe(footer(DEPRECATED_FOOTER));
};

function write(stream, filename) {
  if(filename !== undefined) {
    stream = stream
      .pipe(rename(filename))
  }

  return stream
    .pipe(gulp.dest(DIST_DIR));
};

function build() {
  return merge(
    write(bundle('SpaceDudClient.js'), 'space-dud-client.js'),

    write(deprecate(bundle('ControllerConnection.js'))),
    write(deprecate(bundle('GamepadConnection.js'))),
    write(deprecate(bundle('KeyboardConnection.js'))),
    write(deprecate(bundle('DisplayConnection.js')))
  );
};

gulp.task('client-build', build);
gulp.task('client-clean', clean);
