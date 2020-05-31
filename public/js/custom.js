(function($) {
    "use strict";

	/* ..............................................
	Loader
    ................................................. */

	$(window).on('load', function() {
		$('.preloader').fadeOut();
		$('#preloader').delay(550).fadeOut('slow');
		$('body').delay(450).css({'overflow':'visible'});
	});


	/* ..............................................
    SignInPopUp
    ................................................. */
    $('#seConnecter').click(function(){
      $(".signInPopUpContainer").css("display","flex");
    });
    $('.close').click(function(){
      $(".signInPopUpContainer").css("display","none");
    });
    $('.close1').click(function(){
      $(".signInPopUpContainer").css("display","none");
    });
    $('#signUp').click(function(){
      $('.signInPopUp').addClass("right-panel-active");
    });
    $('#signIn').click(function(){
      $('.signInPopUp').removeClass("right-panel-active");
    });


    /* ..............................................
      Fixed Menu
      ................................................. */

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});

	/* ..............................................
    Gallery
    ................................................. */

	$('#slides').superslides({
		inherit_width_from: '.cover-slides',
		inherit_height_from: '.cover-slides',
		play: 5000,
		animation: 'fade',
	});

	$( ".cover-slides ul li" ).append( "<div class='overlay-background'></div>" );

	/* ..............................................
    Map Full
    ................................................. */

	$(document).ready(function(){
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 600);
			return false;
		});
	});

	/* ..............................................
    Special Menu
    ................................................. */

	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.special-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.special-list').isotope({
			itemSelector: '.special-grid'
		});
	});


	/* ..............................................
    BaguetteBox
    ................................................. */

	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});



	/* ..............................................
    Datepicker
    ................................................. */

	$('.datepicker').pickadate();

	$('.time').pickatime();





}(jQuery));
