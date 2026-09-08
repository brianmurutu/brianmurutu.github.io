(function ($) {
	"use strict";
	
	// JS Index
	//----------------------------------------
	// 1. preloader
	// 2. background image
	// 3. Animate the scroll to top
	// 4. Cats Filter
	// 5. Circular Bars - Knob
	// 6. accordion js
	// 7. mixitup js
	// 8. Contact form with Formspree & Web3Forms fallback
	//-------------------------------------------------
 
	// 1. preloader (Safe hide on load + 1.2s fallback timeout)
	//---------------------------------------------------------------------------
	function hidePreloader() {
		var preloader = $('#preloader');
		if (preloader.length) {
			preloader.fadeOut(400, function() {
				$(this).remove();
			});
		}
	}

	$(window).on('load', function() {
		hidePreloader();
	});

	$(document).ready(function() {
		// Guaranteed fallback in case any external asset is delayed
		setTimeout(hidePreloader, 1200);
	});
 
	// 2. background image
	//---------------------------------------------------------------------------
	$("[data-background]").each(function (){
	    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
	});
 
	// 3. Animate the scroll to top
    // --------------------------------------------------------------------------
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 100) {
			$('#scroll').addClass('show');
		} else {
			$('#scroll').removeClass('show');
		}
	});

	$('#scroll').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0,
		}, 600);
	});

	// 4. Cats Filter
    // ---------------------------------------------------------------------------
	var $catsfilter = $('.cats-filter');
	$catsfilter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$(this).parent().parent().find('a').removeClass('current');
		$(this).addClass('current');
	});

    // 5. Circular Bars - Knob
    // ---------------------------------------------------------------------------
	if (typeof ($.fn.knob) != 'undefined') {
		$('.knob').each(function () {
			var $this = $(this),
			knobVal = $this.attr('data-rel');
	
			$this.knob({
				'draw': function () {
					$(this.i).val(this.cv + '%');
				}
			});
 
			if (typeof ($.fn.appear) != 'undefined') {
				$this.appear(function () {
					$({
						value: 0
					}).animate({
						value: knobVal
					}, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.val(Math.ceil(this.value)).trigger('change');
						}
					});
				}, {
					accX: 0,
					accY: -150
				});
			} else {
				$this.val(knobVal).trigger('change');
			}
		});
 	}

	// 6. accordion js
    // ---------------------------------------------------------------------------
	if (typeof ($.fn.collapse) != 'undefined') {
		$('.accordion-page-wrapper .collapse').collapse();
	}

	// 7. mixitup js
    // --------------------------------------------------------------------------
	if (typeof mixitup !== 'undefined' && $('.mixitup-gallery').length) {
		try {
			mixitup('.mixitup-gallery', {
				selectors: {
					control: '[data-mixitup-control]'
				}
			});
		} catch (e) {
			console.log('MixItUp init notice:', e);
		}
	}

	// 8. Contact form with Formspree (AJAX submission)
    //---------------------------------------------------------------------------
    $(function() {
		var contactForm = document.getElementById('contact-form');
		if (!contactForm) return;

		var $form = $(contactForm);
		var $formMessages = $('.form-message');
		var $submitBtn = $form.find('button[type="submit"]');
		var originalBtnHtml = $submitBtn.html();

		$form.on('submit', function(event) {
			event.preventDefault();

			// Loading state
			$submitBtn.prop('disabled', true).html('<span>Sending... <i class="fas fa-spinner fa-spin ml-2"></i></span>');
			$formMessages.removeClass('error success').text('').hide();

			var endpoint = contactForm.action || 'https://formspree.io/f/mbgjpava';
			var formData = new FormData(contactForm);

			fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			}).then(function(response) {
				$submitBtn.prop('disabled', false).html(originalBtnHtml);
				if (response.ok) {
					$formMessages.removeClass('error').addClass('success').text("Thank you! Your message has been sent successfully. I'll get back to you shortly.").fadeIn();
					contactForm.reset();
				} else {
					response.json().then(function(data) {
						var errorMsg = "Oops! There was a problem submitting your form.";
						if (data && data.errors && data.errors.length > 0) {
							errorMsg = data.errors.map(function(error) { return error.message; }).join(", ");
						} else if (data && data.error) {
							errorMsg = data.error;
						}
						$formMessages.removeClass('success').addClass('error').text(errorMsg).fadeIn();
					}).catch(function() {
						$formMessages.removeClass('success').addClass('error').text("Oops! There was a problem submitting your form.").fadeIn();
					});
				}
			}).catch(function(error) {
				$submitBtn.prop('disabled', false).html(originalBtnHtml);
				$formMessages.removeClass('success').addClass('error').text("Oops! There was a network error. Please try again or email directly to murutubrian@gmail.com").fadeIn();
			});
		});
	});

})(jQuery);
