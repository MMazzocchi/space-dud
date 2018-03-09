var gulp = require('gulp');
var footer = require('gulp-footer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

function buildFile(in_file, out_dir, new_filename) {
  var filename = new_filename;

  if(filename === undefined) {
    filename = path.basename(in_file);
  }

  return new Promise(function(resolve) {
    var stream = browserify(in_file)
      .bundle()
      .pipe(source(filename))
      .pipe(gulp.dest(out_dir));

    stream.on('end', function() {
      var out_file = path.join(out_dir, filename);
      resolve(out_file);
    });
  });
};

function deprecate(in_file, out_dir) {
  var filename = path.basename(in_file);

  return new Promise(function(resolve) {
    var stream = gulp.src(in_file)
      .pipe(footer("console.warn('"+filename+" has been deprecated, and will "+
                   "be removed in a future release.');"))
      .pipe(gulp.dest(out_dir));

    stream.on('end', function() {
      var out_file = path.join(out_dir, filename);
      resolve(out_file);
    });
  });
};

async function buildDeprecatedFile(in_file, out_dir, filename) {
  var out_file = await buildFile(in_file, out_dir, filename);
  return await deprecate(out_file, out_dir);
};

function build() {
  return Promise.all([
    buildFile(path.join(SRC_DIR, 'SpaceDudClient.js'), DIST_DIR,
                        "space-dud-client.js"),

    buildDeprecatedFile(path.join(SRC_DIR, "DisplayConnection.js"), DIST_DIR),
    buildDeprecatedFile(path.join(SRC_DIR, "ControllerConnection.js"),
                        DIST_DIR),
    buildDeprecatedFile(path.join(SRC_DIR, "KeyboardConnection.js"), DIST_DIR),
    buildDeprecatedFile(path.join(SRC_DIR, "GamepadConnection.js"), DIST_DIR)
  ]);
};

gulp.task('client-build', build);
