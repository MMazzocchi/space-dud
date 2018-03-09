var gulp = require('gulp');
var footer = require('gulp-footer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

const CLIENT_SRC = './client/src/';
const CLIENT_DIST = './client/dist/';

function buildFile(in_file, out_dir, new_filename) {
  var filename = new_filename;

  if(filename === undefined) {
    var tokens = in_file.split(/\/+/);
    filename = tokens[tokens.length - 1];
  }

  return new Promise(function(resolve) {
    var stream = browserify(in_file)
      .bundle()
      .pipe(source(filename))
      .pipe(gulp.dest(out_dir));

    stream.on('end', function() {
      resolve(out_dir+"/"+filename);
    });
  });
};

function deprecate(in_file, out_dir) {
  var tokens = in_file.split(/\/+/);
  var filename = tokens[tokens.length - 1];

  return new Promise(function(resolve) {
    gulp.src(in_file)
      .pipe(footer("console.warn('"+filename+" has been deprecated, and will "+
                   "be removed in a future release.');"))
      .pipe(gulp.dest(out_dir));

    resolve(out_dir+"/"+filename);
  });
};

async function buildDeprecatedFile(in_file, out_dir, filename) {
  var out_file = await buildFile(in_file, out_dir, filename);
  return await deprecate(out_file, out_dir);
};

function build() {
  return Promise.all([
    buildFile(CLIENT_SRC+'/SpaceDudClient.js', CLIENT_DIST, "space-dud-client.js"),

    buildDeprecatedFile(CLIENT_SRC+"/DisplayConnection.js",    CLIENT_DIST),
    buildDeprecatedFile(CLIENT_SRC+"/ControllerConnection.js", CLIENT_DIST),
    buildDeprecatedFile(CLIENT_SRC+"/KeyboardConnection.js",   CLIENT_DIST),
    buildDeprecatedFile(CLIENT_SRC+"/GamepadConnection.js",    CLIENT_DIST)
  ]);
};

gulp.task('build', build);
gulp.task('default', gulp.series('build'));
