$(document).ready(function() {
	// $('button').click(disableButton);

    console.log(classes);

    $('button#cogs14b').click(cogs14b);
    $('button#cogs120').click(cogs120);
    $('button#cse100').click(cse100);
    $('button#dsgn100').click(dsgn100);
})

const classes = [
    {
        "cogs14b": [
            {
                "id": "cogs14breviewstandarddeviation",
                "name": "cogs 14b: review standard deviation",
                "time": "4:00 pm",
            },
            {
                "id": "cogs14bquiz8",
                "name": "cogs 14b: quiz 8",
                "time": "6:30 pm",
            }
        ]
    },
    {
        "cogs120": [
            {
                "id": "cogs120abtesting",
                "name": "cogs 120: a/b testing",
                "time": "4:00 pm",
            },
            {
                "id": "cogs120usertesting",
                "name": "cogs 120: user testing",
                "time": "2:30 pm",
            },
            {
                "id": "cogs120implementcalendar",
                "name": "cogs 120: implement calendar",
                "time": "3:00 pm",
            },
            {
                "id": "cogs120implementaddingclass",
                "name": "cogs 120: implement adding class",
                "time": "5:00 pm",
            }
        ]
    },
    {
        "cse100": [
            {
                "id": "cse100finishmilestoneforpa3",
                "name": "cse 100: finish milestone for pa3",
                "time": "4:00 pm",
            },
            {
                "id": "cse100studyforquiz",
                "name": "cse 100: study for quiz",
                "time": "9:30 pm",
            }
        ]
    },
    {
        "dsgn100": [
            {
                "id": "dsgn100interviews",
                "name": "dsgn 100: interviews",
                "time": "4:00 pm",
            },
            {
                "id": "dsgn100prototyping",
                "name": "dsgn 100: prototyping",
                "time": "9:30 pm",
            }
        ]
    }
]

function openNav() {
	document.getElementById("mySidenav").style.width = "225px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function disableButton() {
	var x = document.getElementById("snackbar");

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

function cogs14b() {
    var x = document.getElementById("snackbar");
    $(this).closest('button')[0].disabled = true;
    $(this).closest('button').css('background', 'gray');

    var thisClass = classes[0].cogs14b;
    console.log(thisClass[0]);

    var itemsArray = JSON.parse(localStorage.getItem('items'));
    thisClass.forEach(item => {
        var newTask = {
            "id": item.id,
            "task": item.name,
            "time": item.time,
            "spend": "",
            "spent": 0,
            "done": false
        }
        itemsArray.push(newTask);
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function cogs120() {
    var x = document.getElementById("snackbar");
    $(this).closest('button')[0].disabled = true;
    $(this).closest('button').css('background', 'gray');

    var thisClass = classes[1].cogs120;
    console.log(thisClass[0]);

    var itemsArray = JSON.parse(localStorage.getItem('items'));
    thisClass.forEach(item => {
        var newTask = {
            "id": item.id,
            "task": item.name,
            "time": item.time,
            "spend": "",
            "spent": 0,
            "done": false
        }
        itemsArray.push(newTask);
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function cse100() {
    var x = document.getElementById("snackbar");
    $(this).closest('button')[0].disabled = true;
    $(this).closest('button').css('background', 'gray');

    var thisClass = classes[2].cse100;
    console.log(thisClass[0]);

    var itemsArray = JSON.parse(localStorage.getItem('items'));
    thisClass.forEach(item => {
        var newTask = {
            "id": item.id,
            "task": item.name,
            "time": item.time,
            "spend": "",
            "spent": 0,
            "done": false
        }
        itemsArray.push(newTask);
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function dsgn100() {
    var x = document.getElementById("snackbar");
    $(this).closest('button')[0].disabled = true;
    $(this).closest('button').css('background', 'gray');

    var thisClass = classes[3].dsgn100;
    console.log(thisClass[0]);

    var itemsArray = JSON.parse(localStorage.getItem('items'));
    thisClass.forEach(item => {
        var newTask = {
            "id": item.id,
            "task": item.name,
            "time": item.time,
            "spend": "",
            "spent": 0,
            "done": false
        }
        itemsArray.push(newTask);
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}