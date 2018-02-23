//public js
function openNav() {
	document.getElementById("mySidenav").style.width = "225px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function openAdd() {
	document.getElementById("addPop").style.zIndex = "2";
}

function submitAdd() {
	document.getElementById("addPop").style.zIndex = "-1";
}

function closeAdd() {
	document.getElementById("listInput").placeholder = "add a list"; /* This isn't working */
	document.getElementById("addPop").style.zIndex = "-1";
}