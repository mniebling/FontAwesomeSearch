var bowerFiles = require('bower-files');
var plumber    = require('gulp-plumber');


module.exports = {

	// Various file paths that the tasks will use
	// to read and write
	paths: {

		// Where the files get written to after build
		output: '',

		// Stylesheet sources
		lessFiles: [
			'css/*.less',
			'css/*.css',
			'!compiled.*.css'
		],

		// Javascript sources
		scriptFiles: [
			'js/*.js',
			'data/data.icons.js',
			'!compiled.*.js'
		],

		// Bower package sources
		bowerFiles: bowerFiles().ext('js').files
	},

	// By default, don't break the stream if an error occurs
	// Just log it and continue piping on our merry way
	errorHandler: function () {
		return plumber({
			handleError: function (error) {
				console.log(error);
				this.emit('end');
			}
		})
	}
};
