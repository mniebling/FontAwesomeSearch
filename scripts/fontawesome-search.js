(function ($) {
  'use strict';

  $(function () {

    // grab the icons
    var iconJSON = window.icondata || {},
        icons    = iconJSON.icons,

        // mustache template for rendering the list
        tmpl = $('#tmpl').html(),

        // ms duration for Velocity animations
        DURATION = 75,

        // iterator for the typeahead
        key = '';


    // Sort the icons by name, A-to-Z
    icons.sort(function(a, b) {

      if (a.iconName < b.iconName) {
        return -1;
      }
      if (a.iconName > b.iconName) {
        return 1;
      }
      return 0;
    });


    // Initialize markup stuff
    $('.results').append(window.Mustache.render(tmpl, iconJSON));
    $('tr').tooltip({ placement: 'left' });


    // dom references
    var $inputSearch = $('#input-search'),
        $blankSlate  = $('.blank-slate');


    // Set up a dictionary of names and elements
    var nameToElement = {};

    $('tr.icon-row').each(function(index) {

      var nameAndAliases = $(this).find('td.name').text().trim();
      nameToElement[nameAndAliases] = this;
    });





    // I guess I'll write my own jankety typeahead
    function updateTypeahead () {

      var target      = $inputSearch.val(),
          listIsEmpty = true;


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
    function fadeOutIfNecessary(elem) {

      if(elem.style.display !== 'none') {

        $.Velocity.animate(elem, 'fadeOut', { duration: DURATION });
      }
    }

    function fadeInIfNecessary(elem) {

      if(elem.style.display === 'none') {

        $.Velocity.animate(elem, 'fadeIn', { duration: DURATION });
      }
    }


    // show the preview for a row when it is clicked
    $('tr').on('click', function() {

      var iconUnicode = $(this).data('unicode-point'),
          iconName    = this.id,
          iconURL     = 'http://fortawesome.github.io/Font-Awesome/icon/' + iconName,
          $firstRun   = $('.preview-first-run');

      // replace with Velocity later?
      $firstRun.hide();
      $('.preview-contents').show();

      $('.preview-icon-value').html(iconUnicode);
      $('.preview-icon-name').text(iconName);
      $('.preview-icon-unicode-point').text(iconUnicode);
      $('.preview-icon-external-link').attr('href', iconURL);
    });



    // update the typeahead when the user types in the box
    $('#input-search').on('keyup', updateTypeahead);

    // update the typeahead when the user changes the hash
    $(window).on('hashchange', function () {

      $('#input-search').val((window.location.hash).slice(1));
      updateTypeahead();
    });

    // update the typeahead when the user arrives at the page with a hash
    if(window.location.hash !== "") {

      $('#input-search').val((window.location.hash).slice(1));
      updateTypeahead();
    }

  });
}(window.jQuery));
