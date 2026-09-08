	/* ---------------------------------------------------------------------- */
	/*	Menu
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $content 		= $("#content");
	
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

	
	// // Hover menu effect
	// $content.find('.tabs li a').hover(
	// 	function() {
	// 		$(this).stop().animate({ marginTop: "-7px" }, 200);
	// 	},function(){
	// 		$(this).stop().animate({ marginTop: "0px" }, 300);
	// 	}
	// );

	// Menu Navigation
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