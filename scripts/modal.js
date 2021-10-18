// event listeners for opening modal on button click
let modalButtons = Array.from(document.querySelectorAll('.account-btn'));
let modals = Array.from(document.querySelectorAll('.modal'));


let modalButtonZip = modalButtons.map(function (button, i) {
	console.log([button, modals[i]]);
	return [button, modals[i]];
});

modalButtonZip.forEach(pair => {
	pair[0].addEventListener('click', () => (pair[1].style.display = 'block'));
});

// event listener for closing modal on button click
document.querySelectorAll('.hamburger').forEach(hamburger => {
	hamburger.addEventListener('click', () => {
		document.querySelectorAll('.modal').forEach(modal => (modal.style.display = 'none'));
		document.querySelector('#withdraw__contribution').style.display = 'none';
	});
});

// function for closing modal on click of windows i.e. surrounding space around modal content
document.querySelectorAll('.modal').forEach(modal => {
	window.addEventListener('click', e => {
		document.querySelectorAll('.modal').forEach(element => {
			if (e.target == element) {
				modal.style.display = 'none';
				document.getElementById('withdraw__contribution').style.display = 'none';
			}
		});
	});
});


document.querySelector('#notification-btn').addEventListener('click', () => {
	document.querySelector('.notification').style.transform = 'translateX(0px)';

	setTimeout(() => {
		document.querySelector('.notification').style.transform = 'translateX(400px)';
	}, 4000);
});

document.querySelector('.close-notification-btn').addEventListener('click', () => {
	document.querySelector('.notification').style.transform = 'translateX(400px)';
});

// functionality for opening secondary popups
const openWithdrawContribution = () => {
	document.getElementById('withdraw__contribution').style.display = 'block';
};

document.getElementById('request-withdrawal').addEventListener('click', openWithdrawContribution);
// functionality for notification popup


