/*
 * Add CSE 100 Tasks.
 */

var data = require("../tasks.json");
var classData = require("../cse100tasks.json");

exports.addClass = function(req, res){
	for (i = 0; i < classData.tasks.length; i++) {
		data.tasks.push(classData.tasks[i]);
	}
};