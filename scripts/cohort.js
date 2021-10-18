const amountField = document.getElementById("amount");

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






function validateCohort(e) {
  e.preventDefault();

  let validAmount = /^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/;

  if (!validAmount.test(cohortAmountField.value)) {
    displayError(cohortAmountField, 'Enter correct amount', true);
    return false;
  }
  alert('Cohort creation successful');
}