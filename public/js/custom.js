(function ($) {
	"use strict";

	/* ..............................................
	Loader
    ................................................. */

	$(window).on('load', function () {
		$('.preloader').fadeOut();
		$('#preloader').delay(550).fadeOut('slow');
		$('body').delay(450).css({ 'overflow': 'visible' });
	});

	/* ..............................................
        SCROLL MENU (navbar)
    ................................................. */
	/*remove navbar while scroll down and show again while scroll up*/
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function () {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			document.getElementById("navbar").style.top = "0";
		} else {
			document.getElementById("navbar").style.top = "-140px";
		}
		prevScrollpos = currentScrollPos;
	}


	/* ..............................................
    SignInPopUp
    ................................................. */
	$('#seConnecter').click(function () {
		$(".signInPopUpContainer").css("display", "flex");
	});
	$('.close').click(function () {
		$(".signInPopUpContainer").css("display", "none");
	});
	$('.close1').click(function () {
		$(".signInPopUpContainer").css("display", "none");
	});
	$('#signUp').click(function () {
		$('.signInPopUp').addClass("right-panel-active");
	});
	$('#signIn').click(function () {
		$('.signInPopUp').removeClass("right-panel-active");
	});
	$(document).mouseup(function (e) {
		var container = $('.signInPopUp');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$(".signInPopUpContainer").css("display", "none");
		}
		container = $('.top-cart-open .top-cart-content');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$(".top-cart-open").toggleClass("top-cart-open");
		}
	});
	/* ..............................................
		 SUBMIT MENU
		................................................. */
	/*submit menu category to show target sandwichs */
	// $("#v-pills-tab").click(function(e){
	//   $("#categorieRequestInput").val(e.target.innerHTML);
	//   $("#categorieRequest").submit();
	// });


	/* ..............................................
    Gallery
    ................................................. */

	$('#slides').superslides({
		inherit_width_from: '.cover-slides',
		inherit_height_from: '.cover-slides',
		play: 5000,
		animation: 'fade',
	});

	$(".cover-slides ul li").append("<div class='overlay-background'></div>");

	/* ..............................................
    Map Full
    ................................................. */

	$(document).ready(function () {
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function () {
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

	/* ..............................................
		state of nav bar
		................................................. */

	// updated activated state of nav bar according to current page -- ddtran :)
	$(document).ready(function () {
		console.log(current_url);
		$('.ml-auto > active').removeClass('active');
		if (current_url == '') $("#home").addClass('active');
		else $('#' + current_url).addClass('active');
		updateCarted();

		/* ..............................................
			state of nav bar
			................................................. */

		$('#signin').click(function () {
			var errMsg = '';
			var email = $('#signinForm > .email').val();
			var password = $('#signinForm > .password').val();
			if (!email) {
				errMsg = "Please input email.";
			} else if (!password) {
				errMsg = "Please input password.";
			}
			if (errMsg) {
				$('#signinForm > .errMsg').text(errMsg);
				return;
			}
			$.post('signin', {
				'email': email,
				'password': password
			}, function (data, status) {
				if (data == "success") {
					location.href = '/';
				}
				else {
					$('#signinForm > .errMsg').text(data);
				}
			});
		});

		$('#signup').click(function () {
			var errMsg = '';
			var name = $('#signupForm > .name').val();
			var email = $('#signupForm > .email').val();
			var password = $('#signupForm > .password').val();
			if (!email) {
				errMsg = "Please input email.";
			} else if (!password) {
				errMsg = "Please input password.";
			} else if (!name) {
				errMsg = "Please input username.";
			}
			if (errMsg) {
				$('#signupForm > .errMsg').text(errMsg);
				return;
			}
			$.post('signup', {
				'name': $('#signupForm > .name').val(),
				'email': $('#signupForm > .email').val(),
				'password': $('#signupForm > .password').val()
			}, function (data, status) {
				if (data == "success") {
					location.href = '/';
				}
				else {
					$('#signupForm > .errMsg').text(data['message']);
				}
			});
		});
	});
	/* ..............................................
		-----
		................................................. */


}(jQuery));

let handleCountBtn = function () {
	let step = $(this).attr('data-step');
	let target = $(this).attr('data-target');
	let val = Number($(target).text() || $(target).val());
	val += Number(step);
	if (Number($(target).attr('min')) != 'NaN') {
		if ($(target).attr('min') > val) return;
	}
	if (Number($(target).attr('max')) != 'NaN') {
		if ($(target).attr('max') < val) return;
	}
	$(target).text(val) || $(target).val(val);
};

let updateCarted = function() {
	$.post(siteUrl + '/menu/getCarted').done((data) => {
		$('#top-cart').replaceWith(data);
		$("#top-cart-trigger").click(function(e){
			$('#top-cart').toggleClass('top-cart-open');
			e.stopPropagation();
			e.preventDefault();
		});
	});
}