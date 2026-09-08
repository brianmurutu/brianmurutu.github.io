	/* ---------------------------------------------------------------------- */
	/*	Menu & Tab Navigation
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $content = $("#content");
	
	// Run easytabs
  	$content.easytabs({
	  animate			: true,
	  updateHash		: false,
	  transitionIn		:'slideDown',
	  transitionOut	:'slideUp',
	  animationSpeed	:600,
	  tabs			:".tmenu",
	  tabActiveClass	:'active',
	});

	// Enable external buttons (like Let's Work CTA, Contact Me, and footer links) to switch easytabs
	$(document).on('click', 'a[href^="#"]', function(e) {
		var target = $(this).attr('href');
		if (target && target.length > 1 && $(target).length && $(target).closest('#content').length) {
			if (!$(this).closest('.tabs').length && !$(this).is('[data-toggle]') && !$(this).is('[data-filter]') && !$(this).is('[data-mixitup-control]')) {
				e.preventDefault();
				$content.easytabs('select', target);
				$('html, body').animate({
					scrollTop: $content.offset().top - 40
				}, 400);
			}
		}
	});

	// Menu Carousel Navigation
	$(".menu .tabs").carouFredSel({
        responsive          : true,
        direction           : "left",
 	    circular: false,
    	infinite: false,
        pagination  		: "#menu-controls",  
        auto    			: false,
        scroll 			: {
            items           : 1,
            duration        : 300,                        
            wipe    : true
        },
		prev	: {	
			button	: "#menu-prev",
			key		: "right"
		},
		next	: { 
			button	: "#menu-next",
			key		: "left"
		},
	    swipe: {
	        onTouch: true
	    },
        items: {
            width: 140,
            visible: {
              min: 2,
              max: 5
            }
        }           
    });
