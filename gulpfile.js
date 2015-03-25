// Require modules:
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var watch       = require('gulp-watch');
var less        = require('gulp-less');
var print       = require('gulp-print');
var plumber     = require('gulp-plumber');
var bowerFiles  = require('bower-files');
var runSequence = require('run-sequence');


// Options
var outputPath = '';


// Files
var lessFiles = [
  'css/*.less',
  'css/*.css',
  '!compiled.*.css'
];

var scriptFiles = [
  'js/*.js',
  'data/data.icons.js',
  '!compiled.*.js'
];

var bowerJSFiles = bowerFiles().ext('js').files;
console.log('');


// Concatenate all application script files
gulp.task('concat-js', function () {

  return gulp.src(scriptFiles)

    // Output the files to the console
    .pipe(print(function (path) {
      return 'concat-js: ' + path;
    }))

    // Concatenate the scripts into a single file
    .pipe(concat('compiled.app.js'))

    // Write that file to the destination
    .pipe(gulp.dest(outputPath));
});


// Compile all LESS and CSS files into one
gulp.task('compile-css', function () {

  return gulp.src(lessFiles)

    // Output the files to the console
    .pipe(print(function (path) {
      return 'compile-css: ' + path;
    }))

    // Concatenate the styles into a single file
    .pipe(concat('compiled.styles.css'))

    // Don't break the pipe if the LESS compilation errors
    .pipe(plumber({
      handleError: function (error) {
        console.log(error);
        this.emit('end');
      }
    }))

    // Compile the LESS
    .pipe(less())

    // Write that file to the destination
    .pipe(gulp.dest(outputPath));
});


// Compile all the main script files from Bower packages
gulp.task('bower-js', function () {

  return gulp.src(bowerJSFiles)

  // Output the files to the console
  .pipe(print(function (path) {
    return 'bower-js: ' + path;
  }))

  // Concatenate the scripts into a single file
  .pipe(concat('compiled.bower.js'))

  // Write that file to the destination
  .pipe(gulp.dest(outputPath));
});


// Watch the project files for changes and run subtasks as needed
gulp.task('watch', function () {

  gulp.watch(lessFiles,    ['compile-css']);
  gulp.watch(bowerJSFiles, ['bower-js']);
  gulp.watch(scriptFiles,  ['concat-js']);

  return true;
});


// By default: run everything once, then watch
gulp.task('default', function (callback) {

  runSequence(
    'compile-css',
    'bower-js',
    'concat-js',
    'watch',
    callback);
});
