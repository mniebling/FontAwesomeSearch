var gulp   = require('gulp');
var gulpif = require('gulp-if');

// Helper functions to check flags for more concise gulping
// When the flag is true, the stream is piped to the destination
//
// Call them like:
// gulp.src(...)
//     .pipe(when.verbose(do('stuff')))
//     .pipe(etc)

module.exports = {

	verbose: function (destination) {
		return gulpif(gulp.flags.IS_VERBOSE, destination);
	},

	production: function (destination) {
		return gulpif(gulp.flags.IS_PRODUCTION, destination);
	}
};
