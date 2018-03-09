var data = require("../tasks.json");

exports.viewAlt = function(req, res){

  // checking user

  var currentUser = "123456abcdef";
  var pendingData = [];
  for (i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].userID == currentUser) {
          pendingData.push(data.tasks[i]);
      }
  }

  res.render('homeAlt', {
      'tasks': pendingData
  });
};