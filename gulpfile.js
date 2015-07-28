// Modules for base gulpfile
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');


// Require all the subtasks.
// Pass them this instance of gulp as well as our config file:
var config    = require('./gulp/config.js');
var gulp      = require('gulp');
var gulpTasks = requireDir('./gulp');


// Command line flags
// (first two items in argv are `node` and gulp path)
//
// Ones we care about are enumerated below, attached to the
// gulp object so they're freely available inside tasks
var flags = require('minimist')(process.argv.slice(2));

gulp.flags = {
	IS_VERBOSE:    flags.verbose,
	IS_PRODUCTION: flags.prod || flags.production
}


// Kick it off with a blank line for readability
console.log('');


// Default task: run everything once, then watch
gulp.task('default', function (callback) {

	// Debugging output
	if (gulp.flags.IS_VERBOSE) {

		console.log('\n Command line flags:');
		console.log(gulp.flags);
		console.log('');
	}

	runSequence(
		'compile-css',
		'bower-js',
		'app-js',
		'watch',
		callback);
});
