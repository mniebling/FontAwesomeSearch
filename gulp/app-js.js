// Global includes
var config = require('./config.js');
var gulp   = require('gulp');
var when   = require('./when.js');

// Local includes
var concat = require('gulp-concat');
var print  = require('gulp-print');
var uglify = require('gulp-uglify');


// APP-JS
//
// Compile and concat all app scripts
// ----------------------------------------------------------------------------
gulp.task('app-js', function () {

	return gulp.src(config.paths.scriptFiles)

		// --verbose: Output the files to the console
		.pipe(when.verbose(
			print(function (path) {
				return 'app-js: ' + path;
			})
		))

		.pipe(concat('compiled.app.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.paths.output));
});
