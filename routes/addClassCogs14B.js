/*
 * GET adding class page.
 */

var data = require("../tasks.json");
var classData = require("../cogs14Btasks.json");

exports.addClass = function(req, res){
	for (i = 0; i < classData.tasks.length; i++) {
		data.tasks.push(classData.tasks[i]);
	}

};