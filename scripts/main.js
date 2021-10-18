

function hideOrShow(inputField) {
	if (inputField.getAttribute("type") == "text") {
		inputField.setAttribute('type', 'password');
	} else {
		inputField.setAttribute('type', 'text');
	}
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
  alert("Hello World")
	e.preventDefault()
}

function capitalizeCharAt(str, index=0){

	return str.split("").slice(0, index).join("") 
					+ str.charAt(index).toUpperCase()
					+ str.split("").slice(index+1).join("")
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




export {initAppDataObject, checkDataExists, capitalizeCharAt, hideOrShow,
  getExistingData, setExistingData, doNothing, caesarsCipherEncrypt, caesarsCipherDecrypt};