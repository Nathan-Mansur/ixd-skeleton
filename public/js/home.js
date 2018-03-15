// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

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

    var taskList = document.getElementById('tasklist');
	let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

	localStorage.setItem('items', JSON.stringify(itemsArray));
	var data = JSON.parse(localStorage.getItem('items'));

	data.forEach(item => {
		addTaskLS(item.id, item.task, item.time, item.done);
	});

	$('#tasklist li .task a').click(timeSpent);
	$('a#editButton').click(openEdit);
	$('#quote').click(openTime);
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

// add popup
function openTime() {
	document.getElementById("timeSpent").style.zIndex = "2";
}

function closeTime() {
	document.getElementById("timeSpent").style.zIndex = "-1";
}

function submitTime() {
	var timeInput = document.getElementById("spentInput");

	closeTime();
	changeState();

	timeInput.value = "";
}

function timeSpent() {
	var data = JSON.parse(localStorage.getItem('items'));

	var currentItem = $(this).closest('div.task').attr('id');
	localStorage.setItem('currentTask', currentItem);

	var objId = localStorage.getItem('currentTask');

	data.forEach(item => {
		if (item.id === objId) {
			if (!item.done) {
				openTime();
			} else {
				document.getElementById("uncheckCheck").style.zIndex = "2";
			}
		}
	});
}

function uncheckCheck() {
	closeCheck();
	changeState();
}

function closeCheck() {
	document.getElementById("uncheckCheck").style.zIndex = "-1";
}

// check and uncheck tasks
function changeState() {
	var data = JSON.parse(localStorage.getItem('items'));

	var objId = localStorage.getItem('currentTask');

	data.forEach(item => {
		if (item.id === objId) {
			var boxSel = $('.task#' + objId + ' a .box').children('h2');
			var taskSel = $('.task#' + objId + ' a .taskName').children('h2');
			var timeSel = $('.task#' + objId + ' a .time').children('h3');

			if (!item.done) {
				taskSel.css("text-decoration", "line-through");
				timeSel.css("text-decoration", "line-through");
				boxSel.html('&#9745;');
			} else {
				taskSel.css("text-decoration", "none");
				timeSel.css("text-decoration", "none");
				boxSel.html('&#9744;');
			}

			item.done = !item.done;
			localStorage.setItem('items', JSON.stringify(data));
		}
	});
}

// add popup
function openAdd() {
	document.getElementById("addPop").style.zIndex = "2";
}

function submitAdd() {
	document.getElementById("addPop").style.zIndex = "-1";

	let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

	var taskInput = document.getElementById('taskInput');
	var timeInput = document.getElementById('timeInput');
	var spendInput = document.getElementById('spendInput');
	var taskId = "";

	for (i = 0; i < taskInput.value.length; i++) {
        if (taskInput.value[i] != " " && taskInput.value[i] != ":" && taskInput.value[i] != "\'")
            taskId += taskInput.value[i];
    }

	var newTask = {
		"id": taskId,
		"task": taskInput.value,
		"time": timeInput.value,
		"spend": spendInput.value,
		"spent": 0,
		"done": false
	}

	itemsArray.push(newTask);
	localStorage.setItem('items', JSON.stringify(itemsArray));

	addTaskLS(taskId, taskInput.value, timeInput.value, false);

	taskInput.value = "";
	timeInput.value = "";

	window.location.reload();
}

function addTaskLS(id, task, time, done) {
	var htmlString = '<div class="task" id="' + id + '">';
	htmlString += 	 '<div><a href="javascript:void(0)" class="indvTasks" style="text-decoration: none">';
	htmlString += 	 '<div class="box"><h2 style="transform: translateY(-4px) scale(1.4);">';

	if (!done) { htmlString += '&#9744;'; }
	else { htmlString += '&#9745;'; }

	htmlString +=    '</h2></div>';
	htmlString += 	 '<div class="taskName col-sm-12">';
	
	if (!done) { htmlString += '<h2>'; }
	else { htmlString += '<h2 style="text-decoration: line-through">'; }

	htmlString +=	 task + '</h2>';
	htmlString +=	 '<div class="time col-sm-12">';

	if (!done) { htmlString += '<h3>'; }
	else { htmlString += '<h3 style="text-decoration: line-through">'; }

	htmlString +=	 time + '</h3></div></div>';
	htmlString +=	 '</a></div>';

	var li = document.createElement('li');
	li.innerHTML = htmlString;

	var timeNum = findTime(time);

	var ind = addIndex(timeNum);
	var taskList = document.getElementById('tasklist');
	taskList.insertBefore(li, taskList.childNodes[ind]);
}

function findTime(time) {
	var timeNum = "";
	for (i = 0; i < time.length; i++) {
		if (time[i] === ":") { break; }
		timeNum += time[i];
	}

	var timeNum = parseInt(timeNum);
	if (time[time.length - 2] === "p" || time[time.length - 2] === "P") {
		if (timeNum != 12) { timeNum += 12; }
	}

	if (time[time.length - 2] === "a" || time[time.length - 2] === "A") {
		if (timeNum === 12) { timeNum = 0; }
	}

	return timeNum;
}

function addIndex(time) {
	var taskList = document.getElementById('tasklist');
	var listTasks = taskList.getElementsByTagName("li");
	var data = JSON.parse(localStorage.getItem('items'));

	var ind = listTasks.length;
	var done = false;
	for (j = 0; j < listTasks.length; j++) {
		var id = listTasks[j].firstChild.id;
		data.forEach(item => {
			if (item.id === id) {
				var itemTime = findTime(item.time);
				if (time < itemTime) { ind = j; done = true;}
			}
		});
		if (done) { break; }
	}

	return ind;
}

function closeAdd() {
	document.getElementById("taskInput").placeholder = "add a task"; /* This isn't working */
	document.getElementById("addPop").style.zIndex = "-1";
}

// edit button
function openEdit() {
	var taskList = document.getElementById('tasklist');

	localStorage.clear();
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// // selectors
	// var boxSel = $('.task a .box').children('h2');
	// var handleSel = $('.task .my-handle').children('h2');

	// // change box and line
	// if (boxSel.css("color") === "rgb(255, 0, 0)") {
	// 	boxSel.html('&#9744;');
	// 	boxSel.css("color", "white");
	// 	handleSel.html('');
	// } else {
	// 	boxSel.html('&#8722;');
	// 	boxSel.css("color", "red");
	// 	handleSel.html('::');
	// }
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