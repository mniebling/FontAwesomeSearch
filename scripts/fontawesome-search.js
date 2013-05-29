(function ($) {
	'use strict';
	
	$(function () {

		// Initial fetch & render the icons into the HTML
		// so we can work with them as the user searches
		var iconJSON = window.icondata || {},
				tmpl = $('#tmpl').html();

		$('.results').html(window.Mustache.render(tmpl, iconJSON));



		// I guess I'll write my own jankety typeahead
		$('#input-search').keyup(function () {

			var target = $('#input-search').val();

			// Check all the li's to see if they match the search
			// If not, hide them 
			$('li').each(function (index, value) {

				if($(this).attr('data-icon-name').indexOf(target) != -1) {
					$(this).fadeIn('fast');
				}
				else {
					$(this).fadeOut('fast');
				}
			});

		});
	});
}(window.jQuery));