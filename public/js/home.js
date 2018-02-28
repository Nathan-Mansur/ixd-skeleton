// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	$('.task a').click(changeState);

	// pull focus onto tasklist
	document.getElementById("tasklist").focus();

	/* Keep checkmarks when navigating pages 
	var todoList = $('#tasklist').html();
	localStorage.setItem('todoList', JSON.stringify(todoList));
	var retrievedObject = localStorage.getItem('todoList');
	document.getElementById('tasklist').innerHTML = JSON.parse(retrievedObject);
	*/
})

// Keeps the new added tasks across webpages
fs = require('fs');
var m = JSON.parse(fs.readFileSync('tasks.json').toString());
m.forEach(function(p){
    p.name= m.name;
});
fs.writeFile('tasks.json', JSON.stringify(m));

// Loads date
window.onload = function date(){
	n = new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}

// Date chooser on Popup
 $(document).ready(function(){
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

function openEdit() {
	var editButton = $('a#editButton div').children('h2');
	$('.delete h2').style.display = "inline";
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
	document.getElementById("taskInput").placeholder = "add a task"; /* This isn't working */
	document.getElementById("addPop").style.zIndex = "-1";
}

function startTour() {
	// shepherd touring
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

/*
window.onload = function what() {
	var todoList = $('#tasklist').html();
	localStorage.setItem("todoList", todoList);
	document.getElementById('tasklist').innerHTML = localStorage.getItem("todoList");
}
*/