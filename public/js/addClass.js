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
	$(this).closest('form').submit();
	console.log("Here");
	$(this).closest('button')[0].disabled = true;
	console.log(this.disabled);
	$(this).closest('button').css('background', 'gray');
}