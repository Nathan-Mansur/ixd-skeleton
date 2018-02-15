
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
var login = require('./routes/login');
var newAccount = require('./routes/newAccount');
var challenge = require('./routes/challenge');
var addFriend = require('./routes/addFriend');

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

app.get('/', login.view);
// Example route
// app.get('/users', user.list);
app.get('/tasks', tasks.view);
app.get('/add', add.addTask);
app.get('/addClass', addClass.view);
app.get('/calendar', calendar.view);
app.get('/social', social.view);
app.get('/index', index.view);
app.get('/newAccount', newAccount.view);
app.get('/challenge', challenge.view);
app.get('/addFriend', addFriend.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
