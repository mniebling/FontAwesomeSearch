(function ($) {
	'use strict';
	
	$(function () {

		// Initial fetch & render the icons into the HTML
		// so we can work with them as the user searches
		var iconJSON = window.icondata || {},
				tmpl = $('#tmpl').html();

		$('.results').html(window.Mustache.render(tmpl, iconJSON));


		// To begin, hide 'em all
		$('li').hide();


		// I guess I'll write my own jankety typeahead
		$('#input-search').keyup(function () {

			var target = $('#input-search').val();

			// Only do stuff if there's 2+ characters typed in,
			// to avoid flashing the entire list when the user first starts typing
			if (target.length > 1) {

				// Check all the li's to see if they match the search
				// If so, show them 
				$('li').each(function (index, value) {

					if($(this).attr('data-icon-name').indexOf(target) != -1) {
						$(this).fadeIn('fast');
					}
					else {
						$(this).fadeOut('fast');
					}
				});
			}

			// Otherwise, there's 0 or 1 characters so hide all the results
			else {
				$('li').fadeOut('fast');
			}

		});
	});
}(window.jQuery));