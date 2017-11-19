(function ($, sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced() {
			var obj = this, args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			}
			;
			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		}
		;
	}
	// smartresize 
	jQuery.fn[sr] = function (fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	}
	;
}
)(jQuery, 'smartresize');


$(document).ready(function () {
	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////
	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();
		jQuery('#header').height(windowHeight);
	}
	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////
	function centerHomeBannerText() {
		var bannerText = jQuery('#header > .center');
		var bannerTextTop = (jQuery('#header').actual('height') / 2) - (jQuery('#header > .center').actual('height') / 2) - 20;
		bannerText.css('padding-top', bannerTextTop + 'px');
		bannerText.show();
	}
	setHomeBannerHeight();
	centerHomeBannerText();
	//Resize events
	jQuery(window).smartresize(function () {
		setHomeBannerHeight();
		centerHomeBannerText();
	});

	var $scrollDownArrow = $('#scrollDownArrow');
	var animateScrollDownArrow = function () {
		$scrollDownArrow.animate({
			top: 5
		}
		, 400, "linear", function () {
			$scrollDownArrow.animate({
				top: -5
			}
			, 400, "linear", function () {
				animateScrollDownArrow();
			}
			);
		});
	};
	animateScrollDownArrow();
	//Set Down Arrow Button
	jQuery('#scrollDownArrow').click(function (e) {
		e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#agenda").offset().top
        }, 1000);
	});
	jQuery('.navclick').click(function (e) {
        $('html, body').animate({
            scrollTop: $(jQuery(this).attr('href')).offset().top
        }, 1000);
	});


});