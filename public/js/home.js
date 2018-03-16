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
		addTaskLS(item.id, item.task, item.time, item.spend, item.done);
	});

	localStorage.setItem('currentEdit', false);

	$('#tasklist li .task a').click(timeSpent);
	$('a#editButton').click(openEdit);
	$('.delete-task').click(checkDelete);
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

	var itemsArray = JSON.parse(localStorage.getItem('items'));
	var itemId = localStorage.getItem('currentTask');
	var time = timeInput.value;

	itemsArray.forEach(item => {
		if (item.id === itemId) {
			localStorage.setItem('cseTime', time);
			timeBreakdown(item.spend, time);
		}
	});

	closeTime();
	changeState();

	timeInput.value = "";
}

function timeBreakdown(time, spent) {
	htmlString = 'you <span style="color: lightblue">estimated </span>[';
	htmlString += time + '] for this task.<br><br>you <span style="color: pink">';
	htmlString += 'actually</span> took [' + spent + '] for this task.';

	var selector = document.getElementById("timeBreakdownLabel");
	console.log(selector.innerHTML);

	selector.innerHTML = htmlString;
	document.getElementById("timeBreakdown").style.zIndex = "2";
}

function closeBreakdown() {
	document.getElementById("timeBreakdown").style.zIndex = "-1";
}

function timeSpent() {
	var data = JSON.parse(localStorage.getItem('items'));

	if (localStorage.getItem('currentEdit') === "false") {
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

	if (checkTimeCap(spendInput.value)) {
		document.getElementById("overTime").style.zIndex = "2";
	} else {
		itemsArray.push(newTask);
		localStorage.setItem('items', JSON.stringify(itemsArray));

		addTaskLS(taskId, taskInput.value, timeInput.value, spendInput.value, false);

		window.location.reload();
	}
	
	taskInput.value = "";
	timeInput.value = "";
	spendInput.value = "";
}

function checkTimeCap(time) {
	var itemsArray = JSON.parse(localStorage.getItem('items'));
	var timeCap = 10 * 60;

	time = parseTime(time);
	console.log(time);

	var totalTime = 0;
	if (itemsArray != null) {
		itemsArray.forEach(item => {
			var taskTime = parseTime(item.spend);
			console.log(taskTime);
			totalTime += taskTime;
		});
	}
	totalTime += time;

	console.log(totalTime);

	return totalTime > timeCap;
}

function parseTime(time) {
	var timeStr = "";
	for (i = 0; i < time.length; i++) {
		if (!isNaN(time[i])) { timeStr += time[i]; }
	}
	
	timeStr = parseInt(timeStr);
	if (time[time.length - 1] === "h") {
		timeStr *= 60;
	}

	return timeStr;
}

function addTaskLS(id, task, time, spend, done) {
	var htmlString = '<div class="task" id="' + id + '">';
	htmlString +=	 '<div><a href="javascript:void(0)" class="indvTasks">';
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

	htmlString +=	 time + '&emsp;&emsp;' + spend + '</h3></div>';

	htmlString += 	 '</div></a></div>';
	htmlString +=	 '<div class="delete-task" style="transform: translateY(10px)"><h3></h3></div>';
	htmlString += 	 '</div>';

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

function closeOver() {
	document.getElementById("overTime").style.zIndex = "-1";
}

function closeAdd() {
	document.getElementById("taskInput").placeholder = "add a task"; /* This isn't working */
	document.getElementById("addPop").style.zIndex = "-1";
}

// edit button
function openEdit() {
	var b = localStorage.getItem('currentEdit');
	var trashSel = $('.task .delete-task').children('h3');
	var boxSel = $('.task a .box').children('h2');

	if (b === "false") {
		trashSel.html('<span class="glyphicon glyphicon-trash"></span>');
		boxSel.html('');
		document.getElementById('addButton').style.zIndex = "-1";
		localStorage.setItem('currentEdit', true);
	} else {
		trashSel.html('');
		boxSel.html('&#9744;');
		document.getElementById('addButton').style.zIndex = "2";
		localStorage.setItem('currentEdit', false);
	}
}

function checkDelete() {
	document.getElementById('deleteCheck').style.zIndex = 2;

	var del = $(this).closest('div.task').attr('id');
	localStorage.setItem('currentDelete', del);
}

function deleteTask() {
	var itemsArray = JSON.parse(localStorage.getItem('items'));
	var id = localStorage.getItem('currentDelete');

	var taskList = document.getElementById('tasklist');
	var listTasks = taskList.getElementsByTagName("li");

	for (i = 0; i < itemsArray.length; i++) {
		if (itemsArray[i].id === id) {
			itemsArray.splice(i, 1);
			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}

	$('.task#' + id).closest('li').remove();

	if (itemsArray.length === 0) { openEdit(); }

	closeDelete();
}

function closeDelete() {
	document.getElementById('deleteCheck').style.zIndex = -1;
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