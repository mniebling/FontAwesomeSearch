// Global includes
var config = require('./config.js');
var gulp   = require('gulp');
var when   = require('./when.js');

// Local includes
var watch = require('gulp-watch');


// WATCH
//
// Watch the project files for changes and run subtasks as needed
// ----------------------------------------------------------------------------
gulp.task('watch', function () {

  gulp.watch(config.paths.bowerFiles,  ['bower-js']);
  gulp.watch(config.paths.lessFiles,   ['compile-css']);
  gulp.watch(config.paths.scriptFiles, ['app-js']);

  return true;
});
