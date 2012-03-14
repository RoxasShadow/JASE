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
function scrollToPlace(place) {
	$('html, body').animate(
		{
			scrollTop: place.offset().top + 1
		}, 
		{
			duration: 1000,
			easing: 'easeInOutQuart'
		}
	);
}

function getSelectedSlide() {
	return parseInt(location.hash.replace('#', ''), 10);
}

function setImageFadeEffect() {
	$('.fade').css('opacity', 0.5);
	$('.fade').hover(
	function() {
		$(this).stop().animate({
			opacity: 1.0
		}, 'slow');
	},
	function() {
		$(this).stop().animate({
			opacity: 0.5
		}, 'slow');
	});
}

function fileExists(url) {
	return $.ajax({
		type: 'HEAD',
		url: url,
		async: false
	}).status == 200;
}

function getSlideNumber() {
	i = 1;
	while(((fileExists('db/'+i+'.json')) && (fileExists('db/'+(i+1)+'.json'))))
		++i;
	return i;
}
