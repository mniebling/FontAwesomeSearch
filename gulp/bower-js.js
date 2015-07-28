// Global includes
var config = require('./config.js');
var gulp   = require('gulp');
var when   = require('./when.js');

// Local includes
var concat = require('gulp-concat');
var print  = require('gulp-print');
var uglify = require('gulp-uglify');


// BOWER-JS
//
// Compile and concat all bower js files
// ----------------------------------------------------------------------------
gulp.task('bower-js', function () {

	return gulp.src(config.paths.bowerFiles)

		// --verbose: Output the files to the console
		.pipe(when.verbose(
			print(function (path) {
				return 'bower-js: ' + path;
			})
		))

		.pipe(concat('compiled.bower.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.paths.output));
});
