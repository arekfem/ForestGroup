'use strict';

const nav = document.querySelector('.nav__items');
const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav__item');
const navHeight = document.querySelector('.nav');
const scrollSpySections = document.querySelectorAll('.section');
const footerYear = document.querySelector('.footer__year');
const burgerBars = document.querySelector('.burger-btn__bars');
const burgerBarsCancel = document.querySelector('.burger-btn__bars-cancel');
const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const userMsg = document.querySelector('#msg');
const formSendBtn = document.querySelector('.contact__form-btn');
const popupContact = document.querySelector('.contact__popup');
const closeBtnPopup = document.querySelector('.contact__popup-close');

const html = document.querySelector('html');
html.style.scrollPaddingTop = navHeight.offsetHeight - 2 + 'px';

const handleNav = () => {
	nav.classList.toggle('nav--active');
	document.body.classList.toggle('sticky-body');
	burgerBars.classList.toggle('hide-btn');
	burgerBarsCancel.classList.toggle('show-btn');

	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
			burgerBars.classList.remove('hide-btn');
			burgerBarsCancel.classList.remove('show-btn');
			document.body.classList.remove('sticky-body');
		});
	});
};


const homeSection = () => {
	const sections = [];

	scrollSpySections.forEach((section) => {
		if (
			window.scrollY <=
			section.offsetTop + section.offsetHeight - navHeight.offsetHeight
		) {
			sections.push(section);

			const activeSection = document.querySelector(
				`[href*="${sections[0].id}"]`
			);

			activeSection.classList.add('scroll-spy-active');
		}
	});
};

const handleScrollSpyStart = () => {
	allNavItems.forEach((item) => {
		item.classList.remove('scroll-spy-active');
	});
	if (document.body.classList.contains('main-page')) {
		homeSection();
	} else if (document.body.classList.contains('offers-page')) {
		allNavItems[2].classList.add('scroll-spy-active');
	} else if (document.body.classList.contains('contact-page')) {
		allNavItems[3].classList.add('scroll-spy-active');
	}
};

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		allNavItems.forEach((item) => {
			item.classList.remove('scroll-spy-active');
		});
		homeSection();
	}
};

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.contact__form-box-error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const clearInputs = (input) => {
	input.forEach((el) => {
		el.value = '';
	});
};

const checkFrom = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length > 0 && input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} powinno składać się z min. ${min} liter.`
		);
		showError(
			userMsg,
			`${userMsg.previousElementSibling.innerText.slice(
				0,
				-1
			)} powinna zawierać min. ${min} znaki.`
		);
	}
};

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popupContact.classList.add('contact__popup-show');
	}
};

const closePopup = () => {
	popupContact.classList.remove('contact__popup-show');
};

handleCurrentYear();
window.addEventListener('load', handleScrollSpyStart);
navBtn.addEventListener('click', handleNav);
window.addEventListener('scroll', handleScrollSpy);
formSendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkFrom([userName, userEmail, userMsg]);
	checkLength(userName, 2);
	checkMail(userEmail);
	checkLength(userMsg, 3);
	checkErrors();
	clearInputs([userName, userEmail, userMsg]);
});
closeBtnPopup.addEventListener('click', closePopup);
