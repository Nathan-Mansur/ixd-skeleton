/*
 * GET calendar page.
 */
var data = require("../public/js/tasks.json");

exports.view = function(req, res){
  res.render('calendar', data);
};