
const passwordField = document.getElementById('password');
const emailField = document.getElementById('email');


document.getElementsByClassName('eye')[0].addEventListener('click', () => hideOrShow(passwordField));

function hideOrShow(inputField) {
	if (inputField.getAttribute("type") == "text") {
		inputField.setAttribute('type', 'password');
	} else {
		inputField.setAttribute('type', 'text');
	}
}



/* --------Form Validation ----------*/

function displayError(inputField, message, errorAsSibling = false) {

	htmlString = `<span style="color: red; position:relative; margin-top:0;';
								padding-top:0; font-size:0.8rem;">${message}<br/><br/></span>`;
	
	inputField.style.border = 'solid 2px red';
	errorAsSibling? inputField.insertAdjacentHTML('afterend', htmlString)
		:inputField.parentElement.insertAdjacentHTML('afterend', htmlString);
		
	document.getElementById("login__form").setAttribute("onsubmit", "doNothing(event)")
	setTimeout(() => {
		inputField.style.border = 'none';
		errorAsSibling? inputField.nextElementSibling.remove()
			:inputField.parentElement.nextElementSibling.remove();

		document.getElementById("login__form").setAttribute("onsubmit", "return validateForm(event)")
	}, 5000);
}

function validateForm(e) {
	e.preventDefault();

	let email = emailField.value.toLowerCase()
	let password = passwordField.value


	let loggedInUserId = userAuthentication(email, password)

	if(loggedInUserId === null) {
		displayError(emailField, '', true);
		displayError(passwordField, 'Username and Password do not match');
		return false
	}
	setLoggedInUser(loggedInUserId)

	alert('Login successful.');
	location.href = "./dashboard_home.html"
	return true;
}

/* ---------- End of Form Validation --------- */



function userAuthentication(email, password){ 
	// Receives email and password
	// Returns ID of user with the corresponding email and password or null if there's no match

	let existingAppData = getExistingData();
	// password = caesarsCipherDecrypt(password, email[0].toUpperCase())

	let user = existingAppData["Users"].filter(user =>
							(user["Email"] === email) && (caesarsCipherDecrypt(user["Password"], email[0].toUpperCase()) === password))

	//If there's no match with email, check username // Authenticate with email or username
	user = (user.length === 0)? existingAppData["Users"].filter(user => 
					(user["Username"] === email) && (caesarsCipherDecrypt(user["Password"], email[0].toUpperCase()) === password))
				:user;
					
	return (user[0])? user[0]["_id"]: null;
}





function getExistingData(){
	return JSON.parse(localStorage.getItem("appDataObject"))
}

function setExistingData(existingAppData){
	localStorage.setItem("appDataObject", JSON.stringify(existingAppData))
}

function setLoggedInUser(_id){
	let existingAppData = getExistingData();
	existingAppData["loggedInUser"] = _id;
	setExistingData(existingAppData);
}



function doNothing(e){
	e.preventDefault()
}



function caesarsCipherEncrypt(str, key){
	let encodedStr = ""
	key = String(key).charCodeAt(0)
	for(let i=0; i<str.length; i++) {
		encodedStr += String.fromCharCode((str[i].charCodeAt(0) + key + 65536/2) % 65536)
		//charCodeAt returns the UTF-16 code unit (an integer between 0 and 65535) of character at given index
	}
	return encodedStr
}

function caesarsCipherDecrypt(encodedStr, key) {
	let decodedStr = ""
	key = String(key).charCodeAt(0)
	for(let i=0; i<encodedStr.length; i++) {
		decodedStr += String.fromCharCode(encodedStr[i].charCodeAt(0) - (key + 65536/2))
		//charCodeAt returns the UTF-16 code unit (an integer between 0 and 65535) of character at given index
	}
	return decodedStr
}