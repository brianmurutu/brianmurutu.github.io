(function ($) {
	"use strict";
	
	// JS Index
	//----------------------------------------
	// 1. preloader
	// 2. background image
	// 3. Animate the scroll to top
	// 4. Cats Filter
	// 4. Circular Bars - Knob
	// 5. accordion js
	// 6. tilt js
	// 7. mixitup js
	// 8. Contact form with Formspree & Web3Forms fallback
    //---------------------------------------------------------------------------
    $(function() {
		var form = $('#contact-form');
		var formMessages = $('.form-message');

		$(form).submit(function(event) {
			event.preventDefault();

			var submitBtn = $(form).find('button[type="submit"]');
			var originalBtnText = submitBtn.html();
			submitBtn.prop('disabled', true).html('<span>Sending...</span>');
			$(formMessages).removeClass('error success').text('');

			var formData = $(form).serialize();
			var formAction = $(form).attr('action') || 'https://formspree.io/f/murutubrian@gmail.com';

			// Attempt AJAX post to configured action
			$.ajax({
				type: 'POST',
				url: formAction,
				data: formData,
				dataType: 'json',
				headers: {
					'Accept': 'application/json'
				}
			}).done(function(response) {
				submitBtn.prop('disabled', false).html(originalBtnText);
				$(formMessages).removeClass('error').addClass('success').text('Thank you! Your message has been sent successfully.');
				if (form[0]) form[0].reset();
			}).fail(function(xhr) {
				// Fallback to Web3Forms direct delivery to murutubrian@gmail.com
				var web3Payload = {
					access_key: "0cdd32fff-eda2-4da3-be43-37d47fbb396b",
					name: $(form).find('input[name="name"]').val(),
					email: $(form).find('input[name="email"], input[name="_replyto"]').val(),
					phone: $(form).find('input[name="phone"]').val(),
					subject: $(form).find('input[name="subject"]').val(),
					message: $(form).find('textarea[name="message"]').val()
				};

				fetch('https://api.web3forms.com/submit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(web3Payload)
				}).then(function(res) {
					return res.json();
				}).then(function(json) {
					submitBtn.prop('disabled', false).html(originalBtnText);
					if (json.success) {
						$(formMessages).removeClass('error').addClass('success').text('Thank you! Your message has been sent successfully.');
						if (form[0]) form[0].reset();
					} else {
						$(formMessages).removeClass('success').addClass('error').text(json.message || 'Thank you for reaching out. Message sent!');
					}
				}).catch(function() {
					submitBtn.prop('disabled', false).html(originalBtnText);
					$(formMessages).removeClass('success').addClass('error').text('Could not send message. Please email murutubrian@gmail.com directly.');
				});
			});
		});
	});

})(jQuery);
