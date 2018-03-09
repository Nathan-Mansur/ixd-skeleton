// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	$('.task a').click(changeState);
	$('a#editButton').click(openEdit);

	$('.task a').click(checkTask);

	// pull focus onto tasklist
	document.getElementById("tasklist").focus();

	/* Keep checkmarks when navigating pages 
	var todoList = $('#tasklist').html();
	localStorage.setItem('todoList', JSON.stringify(todoList));
	var retrievedObject = localStorage.getItem('todoList');
	document.getElementById('tasklist').innerHTML = JSON.parse(retrievedObject);
	*/
})

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/tasks.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function checkTask() {
	ga("send", "event", "task", "finish");

	loadJSON(function(response) {
	// Parse JSON string into object
	var actual_JSON = JSON.parse(response);
	console.log(actual_JSON);
	});
}

// Loads date
window.onload = function date(){
	n = new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}

// Date chooser on Popup
 $(document).ready(function() { 
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

$(".draggable").click(function() {
   $(this).insertBefore($(this).prev());
});


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

	// loadJSON(function(response) {
	// 	// Parse JSON string into object
	// 	var tasksJSON = JSON.parse(response);
	// 	console.log(tasksJSON);

	// 	var taskName = document.getElementById('taskInput').value;
	// 	var taskTime = document.getElementById('timeInput').value;
	// 	var taskID = "";
	// 	for (i = 0; i < taskName.length; i++) {
	//         if (taskName[i] != " " && taskName[i] != ":" && taskName[i] != "\'")
	//             taskID += taskName[i];
 //    	}

	// 	console.log(document.getElementById('taskInput').value);
	// 	var newTask = {
	// 		"id": taskID,
	// 		"name": taskName,
	// 		"time": taskTime,
	// 		"user": '123456abcdef',
 //        	'done': false
	// 	}

	// 	tasksJSON["tasks"].push(newTask);
	// });

	// $('#tasklist').load(document.URL +  ' #tasklist');
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