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
      affichage des sandwich dans le menu
      ................................................. */
      $("#v-pills-tab").click(function(e){
        $("#categorieRequestInput").val(e.target.innerHTML);
        $("#categorieRequest").submit();
      });



    /* ..............................................
      sandwich Details popup
      ................................................. */
      $('.gallery-single ').click(function(){
        $(".popupHeader").html($(".sandTitle").html());
        $(".sandwichDetailsContainer").css("display","inline");
      });

const slidePage = document.querySelector(".sandwichDetailsContainer .slidepage");
const firstNextBtn = document.querySelector(".detailsNextBtn");
const prevBtnSec = document.querySelector(".sandwichDetailsContainer .prev-1");
const nextBtnSec = document.querySelector(".sandwichDetailsContainer .next-1");
const prevBtnThird = document.querySelector(".sandwichDetailsContainer .prev-2");
const nextBtnThird = document.querySelector(".sandwichDetailsContainer .next-2");
const prevBtnFourth = document.querySelector(".sandwichDetailsContainer .prev-3");
const submitBtn = document.querySelector(".sandwichDetailsContainer .orderSubmit");
const progressText = document.querySelectorAll(".sandwichDetailsContainer .step p");
const progressCheck = document.querySelectorAll(".sandwichDetailsContainer .step.check");
const bullet = document.querySelectorAll(".sandwichDetailsContainer .step.bullet");

let max = 4;
let current = 1;

firstNextBtn.addEventListener("click",function(){
	slidePage.style.marginLeft = "-25%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});
nextBtnSec.addEventListener("click",function(){
	slidePage.style.marginLeft = "-50%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});
nextBtnThird.addEventListener("click",function(){
	slidePage.style.marginLeft = "-75%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});
submitBtn.addEventListener("click",function(){
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
	setTimeout(function(){
		alert(document.querySelector("input[name='pain']:checked").value);
		location.reload();
	}, 800);
});



prevBtnSec.addEventListener("click",function(){
	slidePage.style.marginLeft = "0%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});
prevBtnThird.addEventListener("click",function(){
	slidePage.style.marginLeft = "-25%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});
prevBtnFourth.addEventListener("click",function(){
	slidePage.style.marginLeft = "-50%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
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
