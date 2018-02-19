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

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	$('.task a').click(changeState);

	// pull focus onto tasklist
	document.getElementById("tasklist").focus();
})

function changeState(e) {
	e.preventDefault();

	// WHY IS THIS ONLY GETTING THE FIRST ONE T^T
	var taskID = $(this).closest('.task').attr('id');
	console.log(taskID);

	// selectors
	var taskSel = $('.task#' + taskID + ' a .taskName').children('h2');
	var boxSel = $('.task#' + taskID + ' a .box').children('h2');

	// strike through and checkbox
	if (taskSel.css("text-decoration") === "line-through") {
		taskSel.css("text-decoration", "none");
		boxSel.html('&#9744;');
	} else {
		taskSel.css("text-decoration", "line-through");
		boxSel.html('&#9745;');
	}
}

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
	document.getElementById("addPop").style.zIndex = "-1";
}

function startTour() {
	// shepherd touring
	var tour;
	tour = new Shepherd.Tour({
	  defaults: {
	    classes: 'shepherd-theme-arrows',
	    scrollTo: true
	  }
	});

	tour.addStep('example-step', {
	text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
 	attachTo: '#title bottom',
	buttons: [
		{
			text: 'Next',
	    	action: tour.next
		}
	  ]
	});
	tour.start();
}