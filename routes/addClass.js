/*
 * GET adding class page.
 */

var data = require("../tasks.json");
var classData = require("../cogs120tasks.json");

exports.addClass = function(req, res){
  	res.render('addClass');
};