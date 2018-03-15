/*
 * GET tomorrow page.
 */

var data = require("../tomorrowsTasks.json");

exports.view = function(req, res){

  // checking user

  var currentUser = "123456abcdef";
  var pendingData = [];
  for (i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].userID == currentUser) {
          pendingData.push(data.tasks[i]);
      }
  }

  res.render('tomorrow', {
      'tasks': pendingData
  });
};
