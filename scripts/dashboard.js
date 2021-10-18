
if(!(getExistingData()['loggedInUser'])){
  location.href = "./login.html";
}


let user = getUser(getExistingData()["loggedInUser"]);

document.getElementById("logout").addEventListener("click", logout);


document.querySelector(".greet-user").innerHTML = `${greet()}, <br> ${user["First Name"]}`;
document.getElementById("username_display").innerHTML = user["Username"];


function logout(){
  document.getElementById("logout_confirmation").style.display = "block"  
}

function confirm_logout(e){
  let response = e.target.innerHTML.toLowerCase();

  if(response === "yes") {
    setLoggedInUser(null)
    alert("Logout Successful")
    location.href = "./login.html"
  }
  else {
    document.getElementById("logout_confirmation").style.display = "none"
  }
}

function setExistingData(existingAppData){
	localStorage.setItem("appDataObject", JSON.stringify(existingAppData))
}

function getExistingData(){
	return JSON.parse(localStorage.getItem("appDataObject"))
}

function setLoggedInUser(_id){
	let existingAppData = getExistingData();
	existingAppData["loggedInUser"] = _id;
	setExistingData(existingAppData);
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
