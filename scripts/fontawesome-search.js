(function ($) {
  'use strict';

  $(function () {

    // Initial fetch & render the icons into the HTML
    // so we can work with them as the user searches
    var iconJSON = window.icondata || {},
      tmpl = $('#tmpl').html();

    $('.results').html(window.Mustache.render(tmpl, iconJSON));



    // Init bootstrap lib for killer tooltips
    $('tr').tooltip({ placement: 'right' });



    // I guess I'll write my own jankety typeahead
    function updateTypeahead () {

      var target    = $('#input-search').val(),
        $blankSlate = $('.blank-slate'),
        listIsEmpty = true,
        // easier to work with an array than the json object
        icons       = iconJSON.icons;


      // Check all the data to see if they match the search
      // If not, hide the respective table row
      for (var i = 0, max = icons.length; i < max; i++) {

        // Every row has a name, but not all rows have aliases
        var name  = icons[i].iconName,
          aliases = icons[i].aliases || "";

        if(name.indexOf(target) != -1 || aliases.indexOf(target) != -1) {

          $('#' + name).fadeIn('fast');
          listIsEmpty = false;
        }
        else {
          $('#' + name).fadeOut('fast');
        }
      }

      // If there are no li's visible, show the blank slate
      if(listIsEmpty) {
        $blankSlate.fadeIn('fast');
      }
      else {
        $blankSlate.fadeOut('fast');
      }
    }



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
