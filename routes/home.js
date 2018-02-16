/*
 * GET home page.
 */

var data = require("../tasks.json");

exports.view = function(req, res){
  res.render('home', {
      'tasks': data.tasks
  });
  console.log(data);
};

