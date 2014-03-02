
//var easing = require('easing');



$(function() {
	init();
});

function init()
{
	slide = $('.slide');
	button = $('.arrow');
	mywindow = $(window);
	htmlbody = $('html,body');
	dataslide = 1;
	//Setup waypoints plugin
	slide.waypoint(function (event) {
	    //cache the variable of the data-slide attribute associated with each slide
	    dataslide = $(this).attr('data-slide');
	    if (event === 'up') {
	        if (dataslide - 1 == 0) {
	            dataslide = 1;
	        } else {
	            dataslide = dataslide - 1;
	        }
	    }
	});

	//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
	//easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
	function goToByScroll(dataslide, mstime) {
	    $('html,body').animate({
	        scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
	    }, mstime);
	}

    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide, 2000);
    });
}

