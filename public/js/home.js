// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	$('.task a').click(changeState);
	$('a#editButton').click(openEdit);

	// pull focus onto tasklist
	document.getElementById("tasklist").focus();

	var date_input=$('input[name="date"]'); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
    date_input.datepicker(options);
})

// loads date
window.onload = function date(){
	n = new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}

// draggable feature
$(".draggable").click(function() {
   $(this).insertBefore($(this).prev());
});

// check and uncheck tasks
function changeState(e) {
	e.preventDefault();

	var taskID = $(this).closest('.task').attr('id');
	console.log(taskID);

	// selectors
	var taskSel = $('.task#' + taskID + ' a .taskName').children('h2');
	var boxSel = $('.task#' + taskID + ' a .box').children('h2');
	var timeSel = $('.task#' + taskID + ' a .time').children('h3');

	// strike through and checkbox
	if (taskSel.css("text-decoration") === "line-through") {
		taskSel.css("text-decoration", "none");
		timeSel.css("text-decoration", "none");
		boxSel.html('&#9744;');
	} else {
		taskSel.css("text-decoration", "line-through");
		timeSel.css("text-decoration", "line-through");
		boxSel.html('&#9745;');
	}
}

// edit button
function openEdit() {

	// ga("send", "event", "task", "finish");

	// selectors
	var boxSel = $('.task a .box').children('h2');
	var handleSel = $('.task .my-handle').children('h2');

	// change box and line
	if (boxSel.css("color") === "rgb(255, 0, 0)") {
		boxSel.html('&#9744;');
		boxSel.css("color", "white");
		handleSel.html('');
	} else {
		boxSel.html('&#8722;');
		boxSel.css("color", "red");
		handleSel.html('::');
	}
}

// add popup
function openAdd() {
	document.getElementById("addPop").style.zIndex = "2";
}

function submitAdd() {
	document.getElementById("addPop").style.zIndex = "-1";
}

function closeAdd() {
	document.getElementById("taskInput").placeholder = "add a task"; /* This isn't working */
	document.getElementById("addPop").style.zIndex = "-1";
}

// shepherd touring
function startTour() {
	var tour;
	tour = new Shepherd.Tour({
	  defaults: {
	    classes: 'shepherd-theme-dark',
	    scrollTo: true
	  }
	});

	tour.addStep('step1', {
	title: 'Welcome!',
	text: 'Welcome to your favorite to-do app, mnml!',
 	attachTo: '#title bottom',
	buttons: [
		{
			text: 'Next',
	    	action: tour.next
		}
	  ]
	});

	tour.addStep('step2', {
	title: 'Task List',
	text: 'This is your to-do list! We\'ve intelligently sorted it by due date to make sure you finish each assignment on time!',
	attachTo: '#tasklist top',
	buttons: [
		{
			text: 'Next',
			action: tour.next
		}
	]
	});

	tour.addStep('step3', {
	title: 'Quote',
	text: 'An inspirational quote to keep you motivated!',
	attachTo: '#quote top',
	buttons: [
		{
			text: 'Next',
			action: tour.next
		}
	]
	});

	tour.addStep('step4', {
	title: 'Add',
	text: 'Add a task by clicking here!',
	attachTo: '.circle top',
	buttons: [
		{
			text: 'Next',
			action: tour.next
		}
	]
	});

	tour.addStep('step5', {
	title: 'Navigation',
	text: 'Click here to see the different parts of the app including your social circle, adding a class, and more!',
	attachTo: '#openNav bottom',
	buttons: [
		{
			text: 'Next',
			action: tour.next
		}
	]
	});

	tour.addStep('step6', {
	title: 'Enjoy!',
	text: 'Hope you enjoy using this app and are motivated to do work!',
	attachTo: 'body bottom',
	buttons: [
		{
			text: 'Next',
			action: tour.next
		}
	]
	});

	tour.start();
}