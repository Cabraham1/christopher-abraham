
const passwordField = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const emailField = document.getElementById('email');
const usernameField = document.getElementById('username');
const phoneField = document.getElementById('phone');

document.getElementsByClassName('eye')[0].addEventListener('click', () => hideOrShow(passwordField));
//The password field will always come before confirm password, hence index 0
document.getElementsByClassName('eye')[1].addEventListener('click', () => hideOrShow(confirm_password));


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

function validateForm(e) {
	e.preventDefault();
	// alert("Hello")

	let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let strongPassword = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})'
	);
	// let validUsername = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
	
	let email = emailField.value.toLowerCase()
	let username = usernameField.value.toLowerCase()
	let validPhone = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

	
	try {
		if(checkDataExists(emailField.getAttribute("name"), email)){
			displayError(emailField, 'Email already exists.', true);
			return false;
		}
	} catch (error) {} // ignore the error when it is first person to register

	if (!validEmail.test(email)) {
		displayError(emailField, 'Invalid Email address.', true);
		return false;
	}

	try {
		if(checkDataExists(usernameField.getAttribute("name"), username)){
			displayError(usernameField, 'Username already exists.', true);
			return false;
		}
	} catch (error) {}
	
		if (!/(?=.{6,20}$)/.test(usernameField.value)) {
			let message = `Username must be between 6 to 20 characters.`;
			displayError(usernameField, message, true);
			return false;
		}
	if (!/^([a-zA-Z0-9._]+)$/.test(usernameField.value)) {
		let message = `Username can be alphanumeric only.`;
		displayError(usernameField, message, true);
		return false;
	}
	if (!validPhone.test(phoneField.value)) {
		let message = `Invalid phone number.`;
		displayError(phoneField, message, true);
		return false;
	}
	if (!strongPassword.test(passwordField.value)) {
		let message = `Password must be at least eight characters long and must contain at least one lowercase,
		one uppercase, one numeric, and one special character.<br/>`;
		displayError(passwordField, message);
		return false;
	}

	if (passwordField.value !== confirm_password.value) {
		displayError(confirm_password, 'Passwords do not match');
		displayError(passwordField, '');
		return false;
	}

	saveUser()
	confirmationAlert()
	return true;
}

/* ---------- End of Form Validation --------- */



/* Confirmation */
function confirmationAlert(){

	document.getElementById("sign_up_confirmation").style.display = "block"
	setTimeout(() =>{
		document.getElementById("sign_up_confirmation").style.display = "none"
		location.href = "./login.html"
	}, 5000)
}

/* End of Confirmation */

/* ------------ Save Form ------------------- */
function saveUser(){
	let existingAppData = getExistingData() || initAppDataObject()

	let formData = new FormData(sign_up_form)
	let currentUser = {}
	
	let lastUser  = existingAppData["Users"].slice(-1).pop()
	try {
		currentUser["_id"] = lastUser["_id"] + 1 //if the user is the first to register, this will throw a TypeError
	} catch (TypeError) {
		currentUser["_id"] = 1000 //Id to be assigned to the first user to register
	}

	for([key, value] of formData){
		currentUser[key] = (key === "Email")? value.toLowerCase():
												(key === "Username")? value.toLowerCase():
												(key === "First Name")? capitalizeCharAt(value, 0):
												(key === "Last Name")? capitalizeCharAt(value, 0):
												(key === "Password")? caesarsCipherEncrypt(value, key=emailField.value[0].toUpperCase()): //use first letter of email as encryption key
												(key === "Confirm Password")? caesarsCipherEncrypt(value, key=emailField.value[0].toUpperCase()):
												value
	}

	existingAppData["Users"].push(currentUser)
	setExistingData(existingAppData)

}

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


function initAppDataObject(){
	return {"Users":[], "loggedInUser": undefined }
}

function checkDataExists(key, value) {
	return (getExistingData()["Users"].filter(entry => entry[key] === value).length > 0)
	//returns boolean (true is there is any object in 'Users' where 'key' has value of 'value', false otherwise)
}

function getExistingData(){
	return JSON.parse(localStorage.getItem("appDataObject"))
}

function setExistingData(existingAppData){
	localStorage.setItem("appDataObject", JSON.stringify(existingAppData))
}

function doNothing(e){
	e.preventDefault()
}

function capitalizeCharAt(str, index=0){

	return str.split("").slice(0, index).join("").toLowerCase() 
					+ str.charAt(index).toUpperCase()
					+ str.split("").slice(index+1).join("").toLowerCase()
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