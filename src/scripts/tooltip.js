var $ = require('jquery')

var $tipElement
var tooltipTimeout


// Show the tooltip element once it has been added to the DOM
var showTooltip = function () {
  $tipElement.addClass('c-hover-tooltip--visible')
}


// Insert the tooltip element into the DOM
var createHoverTooltip = function (event) {

  var template = '<div class="c-hover-tooltip js-active-hover-tooltip fa fa-2x">' + event.data + '</div>'

  // Add the tooltip element to the document and get a handle to it
  $tipElement = $('body')
    .append(template)
    .find('.js-active-hover-tooltip')

  // We want to position the tooltip relative to the row, regardless of whether
  // an element inside the row gets hovered. We can't ignore pointer events on
  // the children, though, because one of them is a link.
  var row

  if (event.target.classList.contains('c-results__row')) {
    row = event.target
  }
  else row = event.target.parentNode

  // Calculate position
  var parent    = row.getBoundingClientRect()
  var target    = {}
  var tipWidth  = $tipElement.outerWidth()
  var tipHeight = $tipElement.outerHeight()
  var tipMargin = 8 // px

  // Vertical position...
  target.top = parent.top + (parent.height / 2) - (tipHeight / 2)

  // Horizontal position...
  target.left = parent.left - tipWidth - tipMargin

  // Account for potential scrolling
  target.left += window.pageXOffset
  target.top  += window.pageYOffset

  // Position & show it
  $tipElement
    .css('left', target.left + 'px')
    .css('top',  target.top  + 'px')

  tooltipTimeout = window.setTimeout(showTooltip, 150)
}


// Destroy the tooltip element when it's no longer needed
var destroyHoverTooltip = function () {

  $tipElement.remove()
  window.clearTimeout(tooltipTimeout)
}


// Just export a constructor that assigns the event handlers to the elements
// tipString is passed through in event.data
module.exports = function (element, tipString) {

  $(element).on('mouseenter', null, tipString, createHoverTooltip)
  $(element).on('mouseleave', destroyHoverTooltip)

  return $(element)
}
