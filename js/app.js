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
		var data = JSON.stringify(frm.serializeArray());
		$.ajax({
            type: "POST",
            url: "/RSVP",
            data: data
        }).done(function (msg) {
          if (msg == "OK") {
              alert("Thank you for your rsvp!. We have received your details!");
          } else {
              alert("Sorry something went wrong, please try again or get in touch with Mark or Kathryn!");
          }
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



