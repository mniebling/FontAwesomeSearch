var $        = require('jquery')
var _        = require('lodash')
var mustache = require('mustache')
var velocity = require('velocity-animate')

// App modules
var icons   = require('./data.icons.js')
var tooltip = require('./tooltip.js')

// We want to display the icon list alphabetically
icons = _.sortBy(icons, 'id')

// Add a property to each icon containing its full unicode string,
// because the data only has the unicode suffix and we need the whole thing
// in order to render manually inside the tooltips.
_.each(icons, function (icon) {
  icon.unicodeString = '&#x' + icon.unicode
})

// Duration in milliseconds for velocity animations
var DURATION = 75


// Now that the DOM is ready...
$(function () {

  // Mustache template
  var listTemplate = $('#listTemplate').html()

  // Initialize markup stuff
  $('.c-results').append(mustache.render(listTemplate, icons))

	// Initialize a tooltip on each row, with the data-title attribute as the
	// value of the tooltip (this will be the unicode FontAwesome string).
  $('.c-results__row').each(function () {
		tooltip(this, $(this).data('title'))
	})

  // DOM references
  var $inputSearch = $('#input-search')
  var $brandCheck  = $('#check-include-brands')
  var $blankSlate  = $('.blank-slate')


  // Set up a dictionary of names to raw DOM elements
  var nameToElement = {};

  $('.c-results__row').each(function (index) {

    // Grab the actual name and aliases
    var nameAndAliases = $(this).find('.icon-name').text().trim()

    // Append the folded versions if needed
    if (nameAndAliases.indexOf('-') !== -1) {
      nameAndAliases += ' ' + nameAndAliases.replace(/-/g, '%20')
    }

    nameToElement[nameAndAliases] = this

    // We also need to do the first-run hiding of brand icons here
    // because we know the templated DOM elements are done rendering
    if (isBrandIcon(this)) {
      $(this).hide()
    }
  });


  // I guess I'll write my own jankety typeahead
  function updateTypeahead () {

    var target         = $inputSearch.val()
    var listIsEmpty    = true
    var showBrandIcons = $brandCheck.is(':checked')

    // Check rows for matches and show/hide accordingly
    for (var key in nameToElement) {

      // Hide if it doesn't match
      if (_(key).includes(target) === false) {
        fadeOutIfNecessary(nameToElement[key])
      }

      // Hide if we are not showing brand icons and it is a brand icon
      else if (!showBrandIcons && isBrandIcon(nameToElement[key])) {
        fadeOutIfNecessary(nameToElement[key])
      }

      // Otherwise, show
      else {
        fadeInIfNecessary(nameToElement[key])
        listIsEmpty = false
      }
    }

    // If there are no rows visible, show the blank slate
    if (listIsEmpty) {
      $blankSlate.show()
    }
    else {
      $blankSlate.hide()
    }
  }


  // Is this a brand icon? Pass a nameToElement[key] element to find out
  function isBrandIcon (elem) {
    return ($(elem).data('categories').indexOf('Brand') != -1)
  }


  // Velocity animation wrappers
  function fadeOutIfNecessary (elem) {

    if (elem.style.display !== 'none') {
      velocity(elem, 'fadeOut', { duration: DURATION })
    }
  }

  function fadeInIfNecessary (elem) {

    if (elem.style.display === 'none') {
      velocity(elem, 'fadeIn', { duration: DURATION })
    }
  }


  // Show the preview for a row when it is clicked
  $('.c-results__row').on('click', function () {

    var iconName  = this.id
    var iconURL   = 'http://fontawesome.io/icon/' + iconName
    var version   = $(this).data('version')
    var $firstRun = $('.preview-first-run')

    // The prefixed string for display in the UI
    var iconUnicodeString = $(this).data('title')

    // The actual 4-character code point
    var iconUnicodePoint = $(this).data('unicode-point')

    // We need to break apart categories into an array
    var categories = $(this).data('categories').split(',')

    // Replace with velocity later?
    $firstRun.hide()
    $('.preview-contents').show()

    // Populate the simple preview panel elements
    $('.preview-icon-value').html(iconUnicodeString)
    $('.preview-icon-name').text(iconName)
    $('.preview-icon-unicode-point').text(iconUnicodePoint)
    $('.preview-icon-created-version').text('v' + version)
    $('.preview-icon-external-link').attr('href', iconURL)

    // Populate the categories list
    $('.preview-icon-categories').empty()

    _.each(categories, function (value, index) {

      // A category string comes from the data like 'Web Application Icons'.
      // For the link text, remove the 'Icons' part:
      var linkText = value.replace(' Icons', '')

      // For the link URL, it needs to match the FontAwesome category URL,
      // so lowercase it and replace spaces with dashes:
      var linkURL = 'http://fontawesome.io/icons/#' + linkText.toLowerCase().replace(' ', '-')

      // Finally, build the element string and prepend a comma
      // if it's not the first element in the list.
      var element = '<a href="' + linkURL + '">' + linkText + '</a>'

      if (index > 0) {
        element = ', ' + element
      }

      $('.preview-icon-categories').append(element)
    });
  });


  // Update the typeahead...

  // ...when the user types in the box
  $inputSearch.on('keyup', updateTypeahead)

  // ...when the user toggles the brand filter
  $brandCheck.on('change', updateTypeahead)

  // ...when the user changes the hash
  $(window).on('hashchange', function () {

    $('#input-search').val((window.location.hash).slice(1))
    updateTypeahead()
  });

  // ...when the user arrives at the page with a hash
  if(window.location.hash !== '') {

    $('#input-search').val((window.location.hash).slice(1))
    updateTypeahead()
  }
});
