// Add a "checked" symbol when clicking on a list item

/* function addCheck() {
	var checkmarkBox = document.getElement("addCheckmark");
	if (checkmarkBox.style.visibility === "hidden") {
		checkmarkBox.style.visibility = "visible";
	}
	else {
		checkmarkBox.style.visibility = "hidden";
	}
	console.log("Here");
} 
	/* var list = document.querySelector('.box');

	list.addEventListener('click', function(e) {
  	if (e.target.tagName === '.box') {
	  	console.log("Here");
   		e.target.classList.toggle('checked');
  }
}, false);
*/


function openNav() {
	document.getElementById("mySidenav").style.width = "225px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function openAdd() {
	document.getElementById("addPop").style.opacity = "1.0";
}

function submitAdd() {
	document.getElementById("addPop").style.opacity = "0";
}

function closeAdd() {
	document.getElementById("addPop").style.opacity = "0";
}