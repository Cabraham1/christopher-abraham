const amountField = document.getElementById("amount");
const bvnField = document.getElementById("bvn");
const accountNumberField = document.getElementById("account-number");
const cardNumberField = document.getElementById("card-number");
const expiryDateField = document.getElementById("expiry");
const cvvField = document.getElementById("cvv");

const bankAccountField = document.getElementById("bank-account");
const bankBVNField = document.getElementById("bank-bvn");


function displayError(inputField, message, errorAsSibling = false) {

	htmlString = `<span style="color: red; position:relative; margin-top:0;';
								padding-top:0; font-size:0.8rem;">${message}<br/><br/></span>`;
	
	inputField.focus()
	inputField.style.border = 'solid 2px red';
	errorAsSibling? inputField.insertAdjacentHTML('afterend', htmlString)
		:inputField.parentElement.insertAdjacentHTML('afterend', htmlString);
		
	document.getElementById("sign_up_form").setAttribute("onsubmit", "doNothing(event)")
	setTimeout(() => {
		
		inputField.style.border = 'none';
		errorAsSibling? inputField.nextElementSibling.remove()
			:inputField.parentElement.nextElementSibling.remove();

		document.getElementById("sign_up_form").setAttribute("onsubmit", "return validateForm(event)")
		inputField.blur()
	}, 5000);
}

function validateFundWallet(e) {
  e.preventDefault();

  let validAmount = /^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/;

  if (!validAmount.test(amountField.value)) {
    displayError(amountField, 'Enter correct amount', true);
    return false;
  }
  alert('Successful');
}

function validateBVN(e) {
	e.preventDefault();

	let validBVN = /^\d{11}$/;

	if (!validBVN.test(bvnField.value)) {
		displayError(bvnField, 'Incorrect BVN', true);
		return false;
	}
	alert('BVN validation successful');
}

function validateCard(e) {
	e.preventDefault();

	let validAccountNumber = /^\d{10}$/;
	let validCardNumber =/(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/
	let validExpiry = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
	let validCvv =/^[0-9]{3,4}$/
	
	if (!validAccountNumber.test(accountNumberField.value)) {
		displayError(accountNumberField, 'Incorrect Account Number', true);
		return false;
	}
	if (!validCardNumber.test(cardNumberField.value)) {
		displayError(cardNumberField, 'Incorrect Card Number', true);
		return false;
	}
	if (!validExpiry.test(expiryDateField.value)) {
		displayError(expiryDateField, 'Incorrect', true);
		return false;
	}
	if (!validCvv.test(cvvField.value)) {
		displayError(cvvField, 'Enter correct value', true);
		return false;
	}
	alert('Successful')
}

function bankValidation(e) {
	e.preventDefault();
	
	let validAccountNumber = /^\d{10}$/;
	let validBVN = /^\d{11}$/;
	
	if (!validAccountNumber.test(bankAccountField.value)) {
		displayError(bankAccountField, 'Incorrect Account Number', true);
		return false;
	}
	if (!validBVN.test(bankBVNField.value)) {
		displayError(bankBVNField, 'Incorrect BVN', true);
		return false;
	}
	alert("Successful")
}