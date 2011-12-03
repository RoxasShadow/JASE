/*
*    Giovanni Capuano <webmaster@giovannicapuano.net>
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
$(document).ready(function() {
	/* Gives a fade effect to the images which have setted the `fade` class. */
	setImageFadeEffect();
	
	/* Checks the number of available slides. */
	num_slides = getSlideNumber();
	$('#footerid').attr('id', num_slides+1); // `intro` is 0 by default.
	
	/* For each resource, loads and mounts the slides. */ 
	for(i=1; i<=num_slides; ++i) {
		$.ajax({
			type: 'GET',
			url: 'db/'+i+'.json',
			dataType: 'json',
			async: false,
			success: function(data) {
				$('#contents').append('<div class="inner" id="'+data.id+'">'+data.text+'</div>');
				if(i < num_slides)
					$('#contents').append('<div class="clear"></div>');
			}
		});
	}
	
	/*
		Gets the current slide reading the URL;
		Sets the next;
		Does the scroll;
		Refreshes the URL;
		???
		PROFIT!
	*/	
	$('#down').click(function() {
		currentSlide = getSelectedSlide();
		nextSlide = (isNaN(currentSlide)) ? '#1' : '#'+(++currentSlide);
		scrollToPlace($(nextSlide));
		location.href = nextSlide;
	});
	
	$('#moardown').click(function() {
		scrollToPlace($('#'+(num_slides+1)));
		location.href = '#'+(num_slides+1);
	});
	
	$('#moarup').click(function() {
		scrollToPlace($('#0'));
		location.href = '#0';
	});
	
	$('#up').click(function() {
		currentSlide = getSelectedSlide();
		previousSlide = (isNaN(currentSlide)) ? '#0' : '#'+(--currentSlide);
		scrollToPlace($(previousSlide));
		location.href = previousSlide;
	});
	
	/*
		Waits 2 seconds to hide the loader, because resources are in local and require a few to load.
		If you put the app online (they'll need more time to load), delete the follow lines of timeout, so that the overlay disappears when the loading is completed.
	*/
	window.setTimeout(function() {
		$('#welcome').fadeOut('slow');
	}, 2000);
})
