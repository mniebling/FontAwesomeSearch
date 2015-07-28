// Global includes
var config = require('./config.js');
var gulp   = require('gulp');
var when   = require('./when.js');

// Local includes
var concat  = require('gulp-concat');
var less    = require('gulp-less');
var print   = require('gulp-print');


// COMPILE-CSS
//
// Concat LESS and CSS files into one
// ----------------------------------------------------------------------------
gulp.task('compile-css', function () {

	return gulp.src(config.paths.lessFiles)

		.pipe(config.errorHandler())

		// --verbose: Output the files to the console
		.pipe(when.verbose(
			print(function (path) {
		 		return 'compile-css: ' + path;
			})
		))

		.pipe(concat('compiled.styles.css'))
		.pipe(less())
		.pipe(gulp.dest(config.paths.output));
});
