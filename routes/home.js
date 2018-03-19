/*
 * GET home page.
 */

var data = require("../tasks.json");

exports.view = function(req, res){

  // checking user

  var currentUser = "123456abcdef";
  var pendingData = [];
  for (i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].userID == currentUser) {
          pendingData.push(data.tasks[i]);
      }
  }

  res.render('home', {
      'tasks': pendingData
  });
};

// aws comprehend (didn't have time to implement T^T)
/*

var AWS = require('aws-sdk');

AWS.config.apiVersions = {
  comprehend: '2017-11-27',
  // other service API versions
};

AWS.config.loadFromPath('./config.json');

var comprehend = new AWS.Comprehend();

var params = {
  TextList: [ /* required */
  //  '​Start CSE100 PA2 by Tomorrow at 8am',
    /* more text */

    /*
  ]
};

comprehend.batchDetectDominantLanguage(params, function (err, data) {
  if (err) console.log(err, err.stack);             // an error occurred
  else     console.log(data.ResultList[0]);       // successful response
});

*/