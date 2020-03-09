$.fn.equalHeights = function(){
	return this.height( Math.max.apply(this, $.map( this , function(e){ return $(e).height() }) ) );
}

// $(window).load(function() {
$(function() {

	var windowWidth = $(window).width();

	/* $('.homepage-logo ').equalHeights();

	$(window).on('resize', function() {
		if (windowWidth > 767) {
			$('.homepage-logo').css('height', '');
			$('.homepage-logo').equalHeights();
		} else {
			$('.homepage-logo').css('height', '');
		}
	});
	*/

	$('#featuredContent').orbit({
		bullets: true,
		directionalNav: false,
		advanceSpeed: 6000,
		captions: true,
		pauseOnHover: true,
		startClockOnMouseOut: true
	});

	if (windowWidth > 767) {
		$('.products-slider').each(function() {
			$(this).orbit({
				fluid:'930x375',
				timer: false,
				bullets: true,
				pauseOnHover: true,
				startClockOnMouseOut: true
			});
		});
	}

	if (windowWidth > 767) {
		$('#news-slider').orbit({
			fluid:'429x133',
			timer: false,
			bullets: false,
			startClockOnMouseOut: true
		});
	}





	/* tab dropdown for mobile */

	$('#tab-dropdown').on('click', function(e) {
		$(this).toggleClass('open');
		$('#product-tabs').slideToggle();
		e.preventDefault();
	});

	$('#product-tabs dd').on('click', function(e){
		e.preventDefault();

		if ($('#tab-dropdown').is(':visible')) {
			$('#tab-dropdown').toggleClass('open');
			var text = $(this).find('a').text();

			if (windowWidth < 767) {
				$('#product-tabs').slideToggle();
			}

			$('#selected-tab').text(text);

			if (windowWidth < 767) {
				// Get the name of the current tab, so we can fix the load more button
				var currentTab = $(this).find('a').attr('href').replace("#","") + 'Tab';
				var hiddenSlideCount = countHiddenSlides(currentTab);
				var loadMore = $("#load-more-books");
				var loadMoreLinkName = text.toLowerCase();

				if (loadMoreLinkName == 'all featured') {
					loadMoreLinkName = 'featured titles';
				}

				loadMore.html("More " + loadMoreLinkName);

				if (hiddenSlideCount >= 1) {
					if(loadMore.css('display')=="none") {
						loadMore.css({'display':'inline-block'});
					}
				} else {
					loadMore.css({'display':'none'});
				}
			}
		}
	});

	$(window).on("orientationchange",function(e) {
		if ($(window).width() > 767 && $('#product-tabs').is(':hidden')) {
			$('#product-tabs').show();
			$('#product-tabs').css('height', '65px');
			$('#product-tabs').css('margin-bottom', '25px');
		}

		if ($(window).width() < 768) {
			if ($('#tab-dropdown').hasClass('open')) {
				$('#product-tabs').show();
			} else {
				$('#product-tabs').hide();
			}

			$('#product-tabs').css('height', 'auto');
			$('#product-tabs').css('margin-bottom', '0');
		}
	});

	$(window).resize(function() {
		// For desktop browsers only
		if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			if ($(window).width() > 767 && $('#product-tabs').is(':hidden')) {
				$('#product-tabs').show();
				$('#product-tabs').css('height', '68px');
				$('#product-tabs').css('margin-bottom', '22px');
			}

			if ($(window).width() < 768) {
				if ($('#tab-dropdown').is(':visible')) {
					if ($('#tab-dropdown').hasClass('open')) {
						$('#product-tabs').show();
					} else {
						$('#product-tabs').hide();
					}

					$('#product-tabs').css('height', 'auto');
					$('#product-tabs').css('margin-bottom', '0');
				}

				if ($('#tab-dropdown').is(':hidden') && $('#product-tabs').is(':hidden')) {
					$('#product-tabs').show();
				}

				$('#selected-tab').text($('#product-tabs').find('dd.active a').text());
			}
		}
	});


	$('#load-more-books').on('click', function() {
		var $div = $('#featured-tabs').children('li.active').find('.products-slider').children('div:hidden');

		$div.first().slideDown();

		if ($div.length == 1) {
			$(this).fadeOut();
		}

		return false;
	});





	/*toggle headline */

	if (windowWidth < 767) {
		$(".news-section .toggle-section").hide();
		$(".closed-section").hide();

		$('.toggle-title').on('click', function() {
			$(this).find('.toggle-icon').toggleClass('open');
			$(this).next('.toggle-section').slideToggle();
		});
	}

	function countHiddenSlides(tab){
		var counter = 0;
		$('#' + tab + ' > div.products-slider > div').each(function() {
			if ($(this).css("display") == "none") {
				counter++;
			}
		});
		
		return counter;
	}

});