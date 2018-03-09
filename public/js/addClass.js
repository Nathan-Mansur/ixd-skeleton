$(document).ready(function() {
	$('button').click(disableButton);
})

function openNav() {
	document.getElementById("mySidenav").style.width = "225px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function disableButton() {
	var x = document.getElementById("snackbar")

//	var mydata = JSON.parse(classes);
//	console.log(mydata[0].id);
//	console.log(mydata[0].name);
	//if ($(this).closest('button').classes.active == true) {
	$(this).closest('form').submit();
	$(this).closest('button')[0].disabled = true;
	$(this).closest('button').css('background', 'gray');


    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	//	$(this).closest('button').active = false;
//	}
}