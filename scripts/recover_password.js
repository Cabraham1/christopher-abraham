const emailField = document.getElementById("email")



function validateForm(e){
  e.preventDefault()
  let email = emailField.value.toLowerCase()
  let errorMessage = "The Username or email you've entered does not match any account"
  let existingAppData = getExistingData()

  let user = existingAppData["Users"].filter(user => user["Email"] === email)

  //If there's no match with email, check username // Allow use of either email or username
  user = (user.length === 0)? existingAppData["Users"].filter(user => user["Username"] === email): user;

  (user[0])? recoverPassword(user[0]["_id"])
          :displayError(emailField, errorMessage, true);

}






function recoverPassword(user_id){

  let user = getUser(user_id)
  let user_email = user["Email"]
  let password = caesarsCipherDecrypt(user["Password"], user_email[0].toUpperCase())
  let message = `${greet()} ${user["First Name"]}, <br/><br/>

                Here is a your password: ${password}<br/>
                Kindly login and change your password. <br/>
                If you did not request for a reset of your password, please ignore this message.<br/><br/>
                
                Thank you for choosing MoneyBox.<br/><br/>
                
                Regards,<br/>
                The MoneyBox Team`

  Email.send({
    Host: "smtp.gmail.com",
    Username: "moneyboxapp1@gmail.com",
    Password: caesarsCipherDecrypt("胫胖胣胜胖胧胙肥肥肦"),
    To: user_email,
    From: "moneyboxapp1@gmail.com",
    Subject: "MoneyBox: Reset Your Password",
    Body: message,
  })
    .then(function (message) {
      alert("Check your email for a link to reset your password")
      location.href = "./login.html"
    });
}






function getExistingData(){
	return JSON.parse(localStorage.getItem("appDataObject"))
}

function getUser(_id) {
  let existingAppData = getExistingData();

	let user = existingAppData["Users"].filter(user => user['_id'] === _id )
  return user[0]
}

function greet(){
  let today = new Date()
  let hours = today.getHours()
  let greeting  = (hours < 12)? "Good morning":
                  (hours < 16)? "Good afternoon":
                                "Good evening";
  return greeting
}









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


function caesarsCipherDecrypt(encodedStr, key) {
	let decodedStr = ""
	key = String(key).charCodeAt(0)
	for(let i=0; i<encodedStr.length; i++) {
		decodedStr += String.fromCharCode(encodedStr[i].charCodeAt(0) - (key + 65536/2))
		//charCodeAt returns the UTF-16 code unit (an integer between 0 and 65535) of character at given index
	}
	return decodedStr
}