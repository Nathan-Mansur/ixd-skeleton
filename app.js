
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
// Example route
// var user = require('./routes/user');
var tasks = require('./routes/tasks');
var add = require('./routes/add');
var addClass = require('./routes/addClass');
var calendar = require('./routes/calendar');
var social = require('./routes/social');
var home = require('./routes/home');
var newAccount = require('./routes/newAccount');
var challenge = require('./routes/challenge');
var sharedFriends = require('./routes/sharedFriends');
var settings = require('./routes/settings');
var group = require('./routes/group');
var addFriend = require('./routes/addFriend');

//hard code 120 tasks
//var cogs120 = require('./routes/cogs120');

//page taking you to the publicList you click
var publicList = require('./routes/publicList');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
// Example route
// app.get('/users', user.list);
app.get('/tasks', tasks.view);
app.get('/add', add.addTask);
app.get('/addClass', addClass.view);
app.get('/calendar', calendar.view);
app.get('/social', social.view);
app.get('/home', home.view);
app.get('/newAccount', newAccount.view);
app.get('/challenge', challenge.view);
app.get('/sharedFriends', sharedFriends.view);
app.get('/settings', settings.view);
//app.get('/cogs120', cogs120.view);
app.get('/group', group.view);
app.get('/publicList', publicList.view);
app.get('/addFriend', addFriend.add);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
