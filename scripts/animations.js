// javascript for the animations in index.html starts here

const navContainer = document.querySelector('.title__container');
const wrapper = document.querySelector('.observer');

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) {
			navContainer.classList.add('title--container');
		} else {
			navContainer.classList.remove('title--container');
		}
	});
});

observer.observe(wrapper);

let intro = document.querySelector('.intro');
let introImage = document.querySelector('.intro--img');
let introTitle = document.querySelector('.intro__title');

const options = {
	rootMargin: '-300px',
};

const introObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			introImage.classList.add('intro--img');
			introTitle.classList.add('intro__title');
		} else {
			introImage.classList.remove('intro--img');
			introTitle.classList.remove('intro__title');
		}
	});
}, options);

introObserver.observe(intro);

let about = document.querySelector('.about');
let aboutImage = document.querySelector('.about--img');
let aboutTitle = document.querySelector('.about--text');
const aboutOptions = {
	rootMargin: '-300px',
};

const aboutObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			aboutImage.classList.add('about--img');
			aboutTitle.classList.add('about--text');
		} else {
			aboutImage.classList.remove('about--img');
			aboutTitle.classList.remove('about--text');
		}
	});
}, aboutOptions);

aboutObserver.observe(about);

let advert = document.querySelector('.advert');
let avatarImage = document.querySelector('.avatar--animation');
let advertText = document.querySelector('.advert--animation');

const advertObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			avatarImage.classList.add('avatar--animation');
			advertText.classList.add('advert--animation');
		} else {
			avatarImage.classList.remove('avatar--animation');
			advertText.classList.remove('advert--animation');
		}
	});
});

advertObserver.observe(advert);

// javascript for the animations in index.html ends here

// javascript for carousel starts here
const slider = () => {
	let counter = 1;
	setInterval(() => {
		document.getElementById('radio' + counter).checked = true;
		counter++;
		if (counter > 4) {
			counter = 1;
		}
	}, 5000);
};
slider();
// javascript for carousel ends here

// functionality for navigating to the signup page onclick of the landing page button
	document.getElementsByClassName('action')[0].addEventListener('click', () => {
		location.href='/sign_up.html'
	});
	document.getElementsByClassName('action')[1].addEventListener('click', () => {
		location.href='/sign_up.html'
	});
	