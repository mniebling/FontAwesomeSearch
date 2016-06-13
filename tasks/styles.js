// styles.js does the following:
//
// 1. concat all specified style files in the project together into a string
// 2. run the string through the LESS compiler to convert the styles into CSS
// 3. run the resulting CSS through post-css for processing

const _          = require('lodash')
const fs         = require('graceful-fs')
const globConcat = require('glob-concat')
const less       = require('less')
const postcss    = require('postcss')


// First, we use glob-concat to create a flat list of files to be read.
//
// What you specify here will be the order in which the files are concat'ed --
// sometimes this is important!
const styleFilesList = globConcat.sync([
	'node_modules/normalize.css/normalize.css',
	'node_modules/font-awesome/css/font-awesome.css',
	'src/**/*.less'
])

// Read all the style files into a single string for processing.
let lessString = ''

_.each(styleFilesList, file => {
	lessString += fs.readFileSync(file)
})

// Run the LESS compiler on the concatenated styles.
less.render(lessString)
	.then(output => {

		// Run the output through post-processing.
		const postcssPlugins = [
			require('autoprefixer')
		]

		postcss(postcssPlugins)
			.process(output.css)
			.then(result => {
				fs.writeFileSync('dist/compiled.css', result.css)
			})
	})
