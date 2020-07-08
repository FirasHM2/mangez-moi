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
		sandwich Details popup
		................................................. */
	$('.gallery-single ').click(function () {
		$(".popupHeader").html($(".sandTitle").html());
		$(".sandwichDetailsContainer").css("display", "inline");
	});
	$(document).mouseup(function (e) {
		var container = $('.multisteps-form');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$(".sandwichDetailsContainer").css("display", "none");
		}
	});

	//DOM elements
	const DOMstrings = {
	  stepsBtnClass: 'multisteps-form__progress-btn',
	  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
	  stepsBar: document.querySelector('.multisteps-form__progress'),
	  stepsForm: document.querySelector('.multisteps-form__form'),
	  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
	  stepFormPanelClass: 'multisteps-form__panel',
	  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
	  stepPrevBtnClass: 'js-btn-prev',
	  stepNextBtnClass: 'js-btn-next' };


	//remove class from a set of items
	const removeClasses = (elemSet, className) => {

	  elemSet.forEach(elem => {

	    elem.classList.remove(className);

	  });

	};

	//return exect parent node of the element
	const findParent = (elem, parentClass) => {

	  let currentNode = elem;

	  while (!currentNode.classList.contains(parentClass)) {
	    currentNode = currentNode.parentNode;
	  }

	  return currentNode;

	};

	//get active button step number
	const getActiveStep = elem => {
	  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
	};

	//set all steps before clicked (and clicked too) to active
	const setActiveStep = activeStepNum => {

	  //remove active state from all the state
	  removeClasses(DOMstrings.stepsBtns, 'js-active');

	  //set picked items to active
	  DOMstrings.stepsBtns.forEach((elem, index) => {

	    if (index <= activeStepNum) {
	      elem.classList.add('js-active');
	    }

	  });
	};

	//get active panel
	const getActivePanel = () => {

	  let activePanel;

	  DOMstrings.stepFormPanels.forEach(elem => {

	    if (elem.classList.contains('js-active')) {

	      activePanel = elem;

	    }

	  });

	  return activePanel;

	};

	//open active panel (and close unactive panels)
	const setActivePanel = activePanelNum => {

	  //remove active class from all the panels
	  removeClasses(DOMstrings.stepFormPanels, 'js-active');

	  //show active panel
	  DOMstrings.stepFormPanels.forEach((elem, index) => {
	    if (index === activePanelNum) {

	      elem.classList.add('js-active');

	      setFormHeight(elem);

	    }
	  });

	};

	//set form height equal to current panel height
	const formHeight = activePanel => {

	  const activePanelHeight = activePanel.offsetHeight;

	  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

	};

	const setFormHeight = () => {
	  const activePanel = getActivePanel();

	  formHeight(activePanel);
	};

	//STEPS BAR CLICK FUNCTION
	DOMstrings.stepsBar.addEventListener('click', e => {

	  //check if click target is a step button
	  const eventTarget = e.target;

	  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
	    return;
	  }

	  //get active button step number
	  const activeStep = getActiveStep(eventTarget);

	  //set all steps before clicked (and clicked too) to active
	  setActiveStep(activeStep);

	  //open active panel
	  setActivePanel(activeStep);
	});

	//PREV/NEXT BTNS CLICK
	DOMstrings.stepsForm.addEventListener('click', e => {

	  const eventTarget = e.target;

	  //check if we clicked on `PREV` or NEXT` buttons
	  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
	  {
	    return;
	  }

	  //find active panel
	  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

	  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

	  //set active step and active panel onclick
	  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
	    activePanelNum--;

	  } else {

	    activePanelNum++;

	  }

	  setActiveStep(activePanelNum);
	  setActivePanel(activePanelNum);

	});

	//SETTING PROPER FORM HEIGHT ONLOAD
	window.addEventListener('load', setFormHeight, false);

	//SETTING PROPER FORM HEIGHT ONRESIZE
	window.addEventListener('resize', setFormHeight, false);

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

	// updated activated state of nav bar according to current page -- ddtran :)
	$(document).ready(function () {
		console.log(current_url);
		$('.ml-auto > active').removeClass('active');
		if (current_url == '') $("#home").addClass('active');
		else $('#' + current_url).addClass('active');

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
				console.log("status", status);
				console.log("data", data);
				if (data == "success") {
					alert("success in signin");
					location.href = '/';
				}
				else {
					alert("failed in signin");
				}
			});
		});

		$('#signup').click(function () {
			$.post('signup', {
				'name' : $('#signupForm > .name').val(),
				'email': $('#signupForm > .email').val(),
				'password': $('#signupForm > .password').val()
			}, function (data, status) {
				console.log("status", status);
				console.log("data", data);
				if (data == "success") {
					alert("success in signup");
					location.href = '/';
				}
				else {
					alert("failed in signup");
				}
			});
		});
	});


}(jQuery));
