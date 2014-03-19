
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function () {
    init();

    $(".reallink").click(function (e) {
        var url = $(this).prop('href');
        window.open(url, '_blank');
    });

    $('.fancybox-media').fancybox({
        openEffect: 'none',
        helpers: {
            media: {}
        },
        'afterClose': function () {
            goToByScroll(9, 'easeInOutQuint'); // go to photos again
        }

    });

    $("#submitForm").click(function () {
        var frm = $('#rsvpform');
        var data = frm.serializeObject();
        $.ajax({
            type: "POST",
            url: "http://www.pristinecleaningsussex.co.uk/RSVP/",
            data: data
        }).success(function (data, textStatus, jqXHR) {
            $feedback = $('#feedbackmodal');
            if (data == "OK") {
                $('.btn', '#feedbackmodal').addClass('btn-success');
                $('.modal-body', $feedback).html("Thank you for your rsvp!. We have received your details!");
            } else {
                $('.btn', '#feedbackmodal').addClass('btn-danger');
                $('.modal-body', $feedback).html("Sorry something went wrong!<br/>Please try again or get in touch with Mark or Kathryn!");
            }
            $feedback.modal('show');
        }).error(function (data, textStatus, jqXHR) {
            $feedback = $('#feedbackmodal');
            $('.modal-body', $feedback).html("Sorry something went wrong!<br/>Please try again or get in touch with Mark or Kathryn!");
            $('.btn', $feedback).addClass('btn-danger');
            $feedback.modal('show');
        });
    });
});

//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. 
function goToByScroll(dataslide, mstime) {
	$('html,body').animate({
        scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
    }, mstime);
    setActivePage(dataslide);
}

function setActivePage(dataslide) {
    $('li').removeClass('active');
    $('.data-slide-link[data-slide="' + dataslide + '"]', '.nav').parentsUntil('navbar-nav').addClass('active');
}


function init() {
    slide = $('.slide');
    button = $('.arrow');
    mywindow = $(window);
    htmlbody = $('html,body');
    dataslide = 1;
	var isMobile = (/android|mobile|nexus|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    
	if(!isMobile) {
		(function () {
			var timer;
			$(window).bind('scroll', function () {
				clearTimeout(timer);
				timer = setTimeout(refresh, 1000);
			});
			var refresh = function () {
				goToByScroll(dataslide, 500);
			};
		})();
	}

    //Setup waypoints plugin
    slide.waypoint(function (event) {
        //cache the variable of the data-slide attribute associated with each slide
        dataslide = parseInt($(this).attr('data-slide'));
        if (event === 'up') {
            if (dataslide - 1 == 0) {
                dataslide = 1;
            } else {
                dataslide = dataslide - 1;
            }
        }
    });
	
	$(document).keydown(function(e) {
		var waypoint = 1;
		// Up
		if (e.keyCode==38) {
			waypoint=parseInt(dataslide);
			if (waypoint==0) { waypoint=1;}
			goToByScroll(waypoint-1,500)
		}
		// Down
		if (e.keyCode==40) {
			waypoint=parseInt(dataslide);	
			if( waypoint < 12) {
				goToByScroll(waypoint+1,500)
			}
		}
	});


    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide, 'easeInOutQuint');
    });

    $('.data-slide-link').click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide, 'easeInOutQuint');
    });
}



