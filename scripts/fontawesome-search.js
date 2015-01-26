(function ($) {
  'use strict';

  $(function () {

    // Grab the icons
    var iconJSON = window.icondata || {};
    var icons    = iconJSON.icons;

    // Mustache template
    var listTemplate  = $('#listTemplate').html();

    // Duration in milliseconds for Velocity animations
    var DURATION = 75;

    // Iterator for the typeahead
    var key = '';


    // Sort the icons by name, A-to-Z
    icons.sort(function(a, b) {

      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });


    // Set up unicode strings for use in the UI
    for (var i = 0; i < icons.length; i++) {
      icons[i].unicodeString = '&#x' + icons[i].unicode;
    }


    // Initialize markup stuff
    $('.results').append(window.Mustache.render(listTemplate, iconJSON));
    $('tr').tooltip({ placement: 'left' });


    // DOM references
    var $inputSearch = $('#input-search');
    var $blankSlate  = $('.blank-slate');


    // Set up a dictionary of names and elements
    var nameToElement = {};

    $('tr.icon-row').each(function(index) {

      var nameAndAliases = $(this).find('td.name').text().trim();
      nameToElement[nameAndAliases] = this;
    });


    // I guess I'll write my own jankety typeahead
    function updateTypeahead () {

      var target      = $inputSearch.val();
      var listIsEmpty = true;


      // Check rows for matches and show/hide accordingly
      for (key in nameToElement) {

        if(key.indexOf(target) !== -1) {

          fadeInIfNecessary(nameToElement[key]);
          listIsEmpty = false;
        }
        else {
          fadeOutIfNecessary(nameToElement[key]);
        }
      }

      // If there are no rows visible, show the blank slate
      if(listIsEmpty) {
        $blankSlate.show();
      }
      else {
        $blankSlate.hide();
      }
    }


    // Velocity animation wrappers
    function fadeOutIfNecessary (elem) {

      if(elem.style.display !== 'none') {
        $.Velocity.animate(elem, 'fadeOut', { duration: DURATION });
      }
    }

    function fadeInIfNecessary (elem) {

      if(elem.style.display === 'none') {
        $.Velocity.animate(elem, 'fadeIn', { duration: DURATION });
      }
    }


    // Show the preview for a row when it is clicked
    $('tr').on('click', function () {

      var iconName  = this.id;
      var iconURL   = 'http://fontawesome.io/icon/' + iconName;
      var version   = $(this).data('version');
      var $firstRun = $('.preview-first-run');

      // The prefixed string for display in the UI
      var iconUnicodeString = $(this).data('title');

      // The actual 4-character code point
      var iconUnicodePoint = $(this).data('unicode-point');

      // Replace with Velocity later?
      $firstRun.hide();
      $('.preview-contents').show();

      $('.preview-icon-value').html(iconUnicodeString);
      $('.preview-icon-name').text(iconName);
      $('.preview-icon-unicode-point').text(iconUnicodePoint);
      $('.preview-icon-created-version').text('v' + version);
      $('.preview-icon-external-link').attr('href', iconURL);
    });


    // Update the typeahead when the user types in the box
    $('#input-search').on('keyup', updateTypeahead);

    // Update the typeahead when the user changes the hash
    $(window).on('hashchange', function () {

      $('#input-search').val((window.location.hash).slice(1));
      updateTypeahead();
    });

    // Update the typeahead when the user arrives at the page with a hash
    if(window.location.hash !== "") {

      $('#input-search').val((window.location.hash).slice(1));
      updateTypeahead();
    }

  });
}(window.jQuery));
