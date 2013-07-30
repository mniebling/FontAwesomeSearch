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

			var target = $('#input-search').val();

			// Check all the li's to see if they match the search
			// If not, hide them 
			$('tr').each(function (index, value) {

				if($(this).attr('data-icon-name').indexOf(target) != -1) {
					$(this).fadeIn('fast');
				}
				else {
					$(this).fadeOut('fast');
				}
			});
		}



		// update the typeahead when the user types in the box
		$('#input-search').on('keyup', updateTypeahead);


		// update the typeahead when the user changes the hash
		$(window).on('hashchange', function () {

			$('#input-search').val((window.location.hash).slice(1));
			updateTypeahead();
		});


		// update the typeahead when the user arrives at the page with a hash
		if(window.location.hash != "") {

			$('#input-search').val((window.location.hash).slice(1));
			updateTypeahead();
		}

	});
}(window.jQuery));