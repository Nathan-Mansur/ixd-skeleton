/*
 * GET home page.
 */

var data = require("../tasks.json");

exports.view = function(req, res){

  // checking user

  var currentUser = "123456abcdef";
  var pendingData = [];
  for (i = 0; i <  data.tasks.length; i++) {
      if (data.tasks[i].userID == currentUser ){
          pendingData.push(data.tasks[i]);
      }
  }

  res.render('home', {
      'tasks': pendingData
  });
};


// // Imports the Google Cloud client library
// const language = require('@google-cloud/language');

// // Instantiates a client
// const client = new language.LanguageServiceClient();

// // The text to analyze
// const text = 'cse100 pa2 due friday 11:59pm, start tomorrow';

// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };

// // Detects the sentiment of the text
// client
//   .analyzeSentiment({document: document})
//   .then(results => {
//     const sentiment = results[0].documentSentiment;

//     console.log(`Text: ${text}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

// // Detects the syntax of the text
// client
//   .analyzeSyntax({document: document})
//   .then(results => {
//     const syntax = results[0];

//     console.log(`Text: ${text}`);
//     console.log(`Tokens: ${syntax.tokens[4].text.content}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

// aws comprehend
var AWS = require('aws-sdk');

AWS.config.apiVersions = {
  comprehend: '2017-11-27',
  // other service API versions
};

AWS.config.loadFromPath('./config.json');

var comprehend = new AWS.Comprehend();

var params = {
  TextList: [ /* required */
    '​Start CSE100 PA2 by Tomorrow at 8am',
    /* more text */
  ]
};

comprehend.batchDetectDominantLanguage(params, function (err, data) {
  if (err) console.log(err, err.stack);             // an error occurred
  else     console.log(data.ResultList[0]);       // successful response
});