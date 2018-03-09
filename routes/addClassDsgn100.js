/*
 * GET adding class page.
 */

var data = require("../public/js/tasks.json");
var classData = require("../dsgn100tasks.json");

exports.addClass = function(req, res){
	for (i = 0; i < classData.tasks.length; i++) {
		data.tasks.push(classData.tasks[i]);
	}
};