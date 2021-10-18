// const viewMoreContainer = document.querySelector("#card_one");

function displayLoader(div) {
  let loader = document.querySelector(`.${div}_loader`);
  loader.classList.add("load");
}

function removeLoader(div) {
  let loader = document.querySelector(`.${div}_loader`);
  loader.classList.remove("load");
}

const divs = document.querySelectorAll(".new");
// console.log(divs);

// function moreContent() {
//     let container = "";
//   container +=`<div class="history">
// 						<p>Changed Email Address</p>
// 						<span href="#">1 weeks ago</span>
// 					</div>
// 					<div class="history">
// 						<p>Updated Bank Account Details</p>
// 						<span href="#">4 weeks ago</span>
// 					</div>
// 					<div class="history">
// 						<p>Changed Profile Picture</p>
// 						<span href="#">2 months ago</span>
// 					</div>`;
//      viewMoreContainer.innerHTML = container;
// }

const div1 = `<div class="history">
						 <p>Changed Email Address</p>
						<span href="#">1 weeks ago</span>
					</div>
					<div class="history">
						<p>Updated Bank Account Details</p>
						<span href="#">4 weeks ago</span>
					</div>
					<div class="history">
						<p>Changed Profile Picture</p>
						<span href="#">2 months ago</span>
					</div>`;

const div2 = `<div class="history">
						 <p>Changed Email Address</p>
						<span href="#">1 weeks ago</span>
					</div>
					<div class="history">
						<p>Updated Bank Account Details</p>
						<span href="#">4 weeks ago</span>
					</div>
					<div class="history">
						<p>Changed Profile Picture</p>
						<span href="#">2 months ago</span>
					</div>`;

const div3 = `<div class="history">
						 <p>Changed Email Address</p>
						<span href="#">1 weeks ago</span>
					</div>
					<div class="history">
						<p>Updated Bank Account Details</p>
						<span href="#">4 weeks ago</span>
					</div>
					<div class="history">
						<p>Changed Profile Picture</p>
						<span href="#">2 months ago</span>
					</div>`;

function viewMoreCohort(id) {
  // for (let i = 0; i < divs.length; i++) {
  // if (id == divs[i].id) {
  // console.log(id);
  displayLoader(id);
  document.getElementById(`${id}_btn`).style.display = "none";
  setTimeout(() => {
    removeLoader(id);

    let container = "";
    if (id === "card_one") {
      container += div1;
    }
    if (id === "card_two") {
      container += div2;
    }
    if (id === "card_three") {
      container += div3;
    }

    // container += `<div class="history">
    // 			 <p>Changed Email Address</p>
    // 			<span href="#">1 weeks ago</span>
    // 		</div>
    // 		<div class="history">
    // 			<p>Updated Bank Account Details</p>
    // 			<span href="#">4 weeks ago</span>
    // 		</div>
    // 		<div class="history">
    // 			<p>Changed Profile Picture</p>
    // 			<span href="#">2 months ago</span>
    // 		</div>`;

    document.getElementById(id).innerHTML = container;
  }, 3000);
}
