_          = require('lodash')
concat     = require('concat')
globConcat = require('glob-concat')
less       = require('less')

// concat can't deal with globs so we need to first make a list of individual
// files out of our friendly patterns.
//
// What you specify here will be the order in which the files are concat'ed --
// sometimes this is important!
var styleFiles = globConcat.sync([
  'src/styles/normalize.css',
  'src/**/*.less',
  'src/**/*.css'
])

// Concatenate all CSS and LESS files into one, because the LESS compiler
// prefers to deal with one input file at a time.
//
// The third parameter to concat() is an error handling callback which we will
// ignore for now via Lodash's empty function.
concat(styleFiles, 'dist/styles.less', _.noop)
