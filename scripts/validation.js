const saveField = document.getElementById("save");
const amountField = document.getElementById("amount");
const phoneField = document.getElementById("phone");
const passwordField = document.getElementById("password");
const cohortAmountField = document.getElementsByClassName("amounts");
3// const buttonClick = document.getElementById('button');

function displayError(inputField, message, errorAsSibling = false) {

	htmlString = `<span style="color: red; position:relative; margin-top:0;';
								padding-top:0; font-size:0.8rem;">${message}<br/><br/></span>`;
	
	inputField.focus()
	inputField.style.border = 'solid 2px red';
	errorAsSibling? inputField.insertAdjacentHTML('afterend', htmlString)
		:inputField.parentElement.insertAdjacentHTML('afterend', htmlString);
		
	document.getElementById("quick-save-form").setAttribute("onsubmit", "doNothing(event)")
	setTimeout(() => {
		
		inputField.style.border = 'none';
		errorAsSibling? inputField.nextElementSibling.remove()
			:inputField.parentElement.nextElementSibling.remove();

		document.getElementsByClassName("forms").setAttribute("onsubmit", "return validateSave(event)")
		inputField.blur()
	}, 5000);
}

function validateSave(e) {
  e.preventDefault();
  // alert("Save")

  let validSave = /^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/;

  if (!validSave.test(saveField.value)) {
    displayError(saveField, 'Enter correct amount', true)
    return false;
  }
  alert("successful")
}

function validateWithdraw(e) {
  e.preventDefault();
  // alert("with")
  let validAmount = /^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/;
  let validPhone = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;
  let strongPassword = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})'
	);


  if (!validAmount.test(amountField.value)) {
    let message = 'Enter correct amount';
    displayError(amountField, message, true);
    return false;
  }
  if (!validPhone.test(phoneField.value)) {
    let message = 'Enter correct phone number'
    displayError(phoneField, message, true);
    return false;
  }
  if (!strongPassword.test(passwordField.value)) {
		let message = 'Incorrect password';
		displayError(passwordField, message);
		return false;
	}

  alert('Successful');
}

function doNothing(e){
	e.preventDefault()
}
